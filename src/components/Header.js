import '../Components.css';
import React from 'react';

const Header = (props) => {

    const {name, description} = props;

    return (
        <div className="topicHeader">
            <h1>Searching {name}</h1>
            <h3>Description: {description}</h3>
        </div>
    )
}
export default Header;