import React from "react";

const Header = ({title}) => {
    return (
        //<header style={headerStyle}>
        <header className='header'>
            <h1>{title}</h1>
        </header>
    )
}

const headerStyle = {
    color: 'red',
    backgroundColor: 'black'
}
export default Header