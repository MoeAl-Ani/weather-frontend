import React from "react";

const WeatherComponent = ({city, temp, clear, desc}) => {
    if (!city || !temp) {
        return null
    }
    return (
        <div>
            <p>CITY :  {city || ''}</p>
            <p>TEMP :  {temp || ''}</p>
            <p>MAIN :  {clear || ''}</p>
            <p>DESCRIPTION :  {desc || ''}</p>
        </div>
    )
}

export default WeatherComponent