
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
const Planet = (props) => {
    const [data, setData] = useState(null);
    const [ chardata, setCharData] = useState(null);
    const [filmdata, setFilmData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fresponse = await fetch(`${import.meta.env.VITE_PLANETS_API_URL}/${params.id}/films`);
        const cresponse = await fetch(`${import.meta.env.VITE_PLANETS_API_URL}/${params.id}/characters`);
        const response = await fetch(`${import.meta.env.VITE_PLANETS_API_URL}/${params.id}`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        const fjson_response = await fresponse.json();
        const cjson_response = await cresponse.json();
        setData(json_response);
        setFilmData(fjson_response);
        setCharData(cjson_response);
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
                <div className="card-text">{data.name}</div>
                <div className="card-text">Climate: {data.climate}</div>
                <div className="card-text">Diameter: {data.diameter}</div>
                <div className="card-text">Population: {data.population}</div>
                <div className="card-text">Films: </div>
                {filmdata.map((film) => (
                    <Link to={`/films/${film.id}`}>
                    <div key={film.id} div className="card-text"  style={{backgroundColor:'lightblue', borderRadius:'20px', margin:'20px' }}>{film.title}</div>
                    </Link>
                ))}
                <div className="card-text">Characters: </div>
                {chardata.map((char) => (
                    <Link to={`/characters/${char.id}`}>
                    <div key={char.id} div className="card-text"  style={{backgroundColor:'lightblue', borderRadius:'20px', margin:'20px' }}>{char.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Planet;