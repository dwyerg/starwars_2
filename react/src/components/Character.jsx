import React from 'react';
import { useParams } from 'react-router-dom';

const Character = (props) => {
    const params = useParams();
    let id = params.id;

    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <div className="card-text">{props.data.name}</div>
                <div className="card-text">{props.data.id}</div>
            </div>
        </div>
    );
};

export default Character;