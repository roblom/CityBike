import React from 'react';
import Stationlist from '../StationList/StationList';
import SearchField from '../Common/SearchField';
import { ViewMode } from '../../data/Types';
import Config from '../../config/CityBike.Config';
import { fetchUrl } from '../../helpers/functions';
import ErrorMessage from './ErrorMessage';
import * as S from './CityBikeStyled';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

class CityBikes extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }

    state = {
        errors: null,
        loading: true,
        locations: null,
        statuses: null,
        filteredLocations: null,
        viewMode: ViewMode.Card
    }

    async componentDidMount() {
        const { locations, statuses } = await this.fetchBikeStationsInfo();
        this.setState({ 
            loading: false,
            locations,
            statuses
        });
    }

    /**
     * Load the data for both locations and statuses, parse result, handle errors.
     */
    async fetchBikeStationsInfo() {
        const apiHeaders = Config.apiHeaders;
        const { locations: locationsUrl, statuses: statusesUrl } = Config.apiUrls;
        const { data: locationsResult, error: locationsError } = await fetchUrl(locationsUrl, apiHeaders);
        const { data: statusesResult, error: statusesError } = await fetchUrl(statusesUrl, apiHeaders);

        if (locationsError !== null || statusesError !== null){
            this.setState({
                errors: [
                    locationsError, 
                    statusesError
                ]
            });
            return { locations: null, statuses: null }; // if any url fails, nothing will display
        }

        return { 
            locations: locationsResult.data.stations,
            statuses: statusesResult.data.stations
        }
    }

    setViewMode(viewMode) {
        this.setState( { viewMode: viewMode } );
        this.focusSearchField();
    }

    handleSearch = (input) => {
        if (input.length === 0){
            this.setState({ filteredLocations: null});
            return;
        }
        const filtered = this.state.locations.filter(location => location.name.toUpperCase().indexOf(input.toUpperCase()) >= 0);
        this.setState({ filteredLocations: filtered });
    }

    focusSearchField = () => {
        this.searchInput.current.focus();
    }

    render(){        
        const isReady = !this.state.loading && this.state.locations !== null;
        const { locations, statuses, filteredLocations, viewMode, errors } = this.state;
        const stationsToDisplay = filteredLocations || locations;

        const stationList = isReady ?
            Stationlist({
                locations: stationsToDisplay,
                statuses,
                viewMode
            })
            : null;
        
            const errorMessages = <ErrorMessage errors={ errors } />;
            const loadingMessage = !isReady && !errorMessages && <S.Loading>Laster inn data...</S.Loading>;
        
        return <S.CityBike>
            <header>
                <DirectionsBike />
                <h1>Tilgjengelige sykler og låser per stativ</h1>
            </header>

            { !errors &&
                <div className="display-options">
                    <SearchField inputRef={ this.searchInput } onSearch={ this.handleSearch } placeholder='Søk etter stasjonsnavn' />
                    <div className="view-mode" title="Visning av stasjoner">
                        <button onClick={ () => this.setViewMode(ViewMode.Card) } disabled={ (viewMode === ViewMode.Card) }><ViewComfyIcon /> Kort</button>
                        <button onClick={ () => this.setViewMode(ViewMode.Table) } disabled={ (viewMode === ViewMode.Table) }><ListAltIcon /> Liste</button>
                    </div>
                </div>
            }
            
            <div>{ loadingMessage }</div>
            <div>{ errorMessages }</div>

            <div className={ 'view-mode-' + this.state.viewMode }>
                { stationList }
            </div>
        </S.CityBike>
    }
}

export default CityBikes;
