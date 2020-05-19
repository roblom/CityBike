import React from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import LocalParkingIcon from '@material-ui/icons/LocalParking';

export default (props) => {
    const { location, bikesAvailable, docksAvailable, title } = props;
    return <li className="station" title={ title }>
        <div className="card">
            <div className="name">{ location.name }</div>
            <div className="status">
                <div className="bikeStatus"><DirectionsBike /> <span className="count">{ bikesAvailable }</span></div>
                <div className="dockStatus"><LocalParkingIcon /> <span className="count">{ docksAvailable }</span></div>
            </div>
            <a className="address" href={ props.mapLink || '#' } target="_blank" rel="noopener noreferrer"><LocationOnOutlinedIcon /><span>{ location.address }</span></a>
        </div>
    </li>;
};
