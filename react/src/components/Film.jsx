
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
const Film = (props) => {
    const [data, setData] = useState(null);
    const [planetdata, setPlanetData] = useState(null);
    const [characterdata, setCharacterData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_FILMS_API_URL}/${params.id}`);
        const presponse = await fetch(`${import.meta.env.VITE_FILMS_API_URL}/${params.id}/planets`);
        const cresponse = await fetch(`${import.meta.env.VITE_FILMS_API_URL}/${params.id}/characters`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        const cjson_response = await cresponse.json();
        const pjson_response = await presponse.json();
        setData(json_response);
        setCharacterData(cjson_response);
        setPlanetData(pjson_response);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData(); 
  }, [params.id]); 

  if (!data) {
    return <div>Loading...</div>; 
  }
    return (
        <div className="card card-background" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <div className="card-text">{data.title}</div>
                <div className="card-text">Characters: </div>
                {characterdata.map((character) => (
                    <Link to={`/characters/${character.id}`}><div key={character.id} div className="card-text"  style={{backgroundColor:'lightblue', borderRadius:'20px', margin:'20px' }}>{character.name}</div>
                </Link>))}
                <div className="card-text">Planets: </div>
                {planetdata.map((planet) => (
                    <Link to={`/planets/${planet.id}`}><div key={planet.id} div className="card-text"  style={{backgroundColor:'lightblue', borderRadius:'20px', margin:'20px' }}>{planet.name}</div>
                </Link>))}
            </div>
        </div>
    );
};

export default Film;