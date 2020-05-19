import React from 'react';
import Stationlist from '../StationList/StationList';
import SearchField from '../Common/SearchField';
import { ViewMode } from '../Common/Types';
import Config from '../../config/CityBike.Config';
import * as S from './CityBikeStyled';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

class CityBikes extends React.Component {
    state = {
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

    setViewMode(viewMode) {
        this.setState( { viewMode: viewMode } );
    }

    async fetchBikeStationsInfo() {
        const { locations: locationsUrl, statuses: statusesUrl } = Config.apiUrls;
        const apiHeaders = Config.apiHeaders;
        const locationsResult = await fetch(locationsUrl, apiHeaders);
        const locationsJson = await locationsResult.json();

        const statusesResult = await fetch(statusesUrl, apiHeaders);
        const statusesJson = await statusesResult.json();

        return { 
            locations: locationsJson.data.stations,
            statuses: statusesJson.data.stations
        }
    }

    handleSearch = (input) => {
        if (input.length === 0){
            this.setState({ filteredLocations: null});
            return;
        }
        const filtered = this.state.locations.filter(location => location.name.toUpperCase().indexOf(input.toUpperCase()) >= 0);
        this.setState({ filteredLocations: filtered });
    }

    render(){        
        const isReady = !this.state.loading && this.state.locations !== null;
        const { locations, statuses, filteredLocations, viewMode } = this.state;
        const stationsToDisplay = filteredLocations || locations;

        const stationList = isReady ?
            Stationlist({
                locations: stationsToDisplay,
                statuses,
                viewMode
            })
            : null;
        
        return <S.CityBike>
            <header>
                <DirectionsBike />
                <h1>Tilgjengelige sykler og låser per stativ</h1>
            </header>

            <div className="display-options">
                <SearchField onSearch={ this.handleSearch } placeholder='Søk etter stasjonsnavn' />
                <div className="view-mode" title="Visning av stasjoner">
                    <button onClick={ () => this.setViewMode(ViewMode.Card) } disabled={ (viewMode === ViewMode.Card) }><ViewComfyIcon /> Kort</button>
                    <button onClick={ () => this.setViewMode(ViewMode.Table) } disabled={ (viewMode === ViewMode.Table) }><ListAltIcon /> Liste</button>
                </div>
            </div>
            
            <div>{ !isReady && <S.Loading>Laster inn data...</S.Loading> }</div>

            <div className={ 'view-mode-' + this.state.viewMode }>
                { stationList }
            </div>
        </S.CityBike>
    }
}

export default CityBikes;
