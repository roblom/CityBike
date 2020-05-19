import React from 'react';
import StationCard from '../StationCard/StationCard';
import StationRow from '../StationRow/StationRow';
import { ViewMode } from '../../data/Types';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import * as S from './StationListStyled';

/**
 * Produces a list of stations, either as table-layout or card-layout
 * @param location List of all locations
 * @param statuses A list of status for each location, hold available bikes / parkings slots
 * @param viewMode 'table' or 'card'
 * @returns An unsorted list or table based on 
 */
export default (props) => {
    if (!props.locations){
        console.warn('StationList is missing "locations"-list');
        return null;
    }
    if (!props.statuses || !props.statuses.length){
        console.warn('StationList is missing "statuses"-list');
        return null;
    }

    // RL[1]: Avoid this for now as initialization eats performance otherwise not gained later on - yet.
    //const statusMap = new Map(props.statuses.map(s => [s.station_id, s]));
    
    const notFound = { num_bikes_available: 0, num_docks_available: 0 };

    const locationStatus = (location) => {
        const status = props.statuses.find( station => station.station_id === location.station_id) || notFound;
        // RL[1] const status = statusMap.get(location.station_id) || notFound;

        return {
            bikesAvailable: status.num_bikes_available,
            docksAvailable: status.num_docks_available
        };
    }

    const DynamicViewComponent = props.viewMode === ViewMode.Table ? StationRow : StationCard;
    const sortedLocations = props.locations.sort( (a, b) => a.name.localeCompare(b.name, undefined, {ignorePunctuation: true, sensitivity: 'base'})); 

    const stations = sortedLocations.map((location, index) => {
        const { bikesAvailable, docksAvailable } = locationStatus(location);
        const title = `Stasjonen ${ location.name } har akkurat nå:\n${ bikesAvailable } tilgjengelige sykler og\n${ docksAvailable } plasser ledig for sykkelparkering.\nAdresse: ${ location.address }`;
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${ location.lat },${ location.lon }`
        return <DynamicViewComponent
            key={index}
            title={title}
            mapLink={mapLink}
            location={location}
            bikesAvailable={bikesAvailable}
            docksAvailable={docksAvailable}></DynamicViewComponent>;
    });

    return (
        <div className="stations">
            { stations.length === 0 ?
                <S.NoStationsFound>
                    Ingen stasjoner funnet, du må kanskje ta beina fatt? <DirectionsRunIcon />{/* Running person */}
                </S.NoStationsFound>
            
            :   ( props.viewMode === ViewMode.Card ?
                    <ul>
                        { stations }
                    </ul> 
                :   /* ELSE ViewMode.Table */
                    <table>
                        <thead>
                        <tr>
                            <th>Stasjonsnavn</th>
                            <th className="count">Sykler tilgjengelig</th>
                            <th className="count">Ledige plasser</th>
                            <th className="count">Kapasitet</th>
                        </tr>
                        </thead>
                        <tbody>
                            { stations }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}