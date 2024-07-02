import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
const CharacterList = (props) => {
    
    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%', backgroundColor:'lightblue', borderRadius:'20px', margin:'20px' }}>
            <div className="card-body">
            <Link to={`/characters/${props.data.id}`}>  
                <div className="card-text">{props.data.name}</div>
                <div className="card-text">{props.data.id}</div>
                </Link>
            </div>
        </div>
    );
};

export default CharacterList;