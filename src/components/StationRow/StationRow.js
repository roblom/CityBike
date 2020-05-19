import React from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

export default (props) => {
    const { location, bikesAvailable, docksAvailable, title } = props;
    return <tr title={ title }>
        <td>
            <div className="name">{ location.name }</div>
            <a className="address" href={ props.mapLink || '#' } target="_blank" rel="noopener noreferrer"><span>{ location.address }</span> <LocationOnOutlinedIcon /></a>
        </td>
        <td className="count">{ bikesAvailable }</td>
        <td className="count">{ docksAvailable }</td>
        <td className="count">{ location.capacity }</td>
    </tr>
}
