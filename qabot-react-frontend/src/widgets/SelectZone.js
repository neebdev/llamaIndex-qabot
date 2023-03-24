import React from 'react';
import './SelectZone.css'

function SelectZone(props)
{
    return(
    <>
        <ul>
            <li>
                <button onClick={props.actionProvider.SelectADGM}>ADGM, Abu Dhabi Global Market</button>
            </li>
            <li>
                <button onClick={props.actionProvider.SelectDAFZ}>DAFZ, Dubai Airport Freezone</button>
            </li>
            <li>
                <button onClick={props.actionProvider.SelectDMCC}>DMCC, Dubai Multi Commodities Centre</button>
            </li>
            <li>
                <button onClick={props.actionProvider.SelectDubaiDesign}>Dubai Design District</button>
            </li>
        </ul>
    </>
);
}
export default SelectZone;