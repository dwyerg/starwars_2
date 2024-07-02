
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
const Character = (props) => {
    const [data, setData] = useState(null);
    const [planetdata, setPlanetData] = useState(null);
    const [filmdata, setFilmData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fresponse = await fetch(`${import.meta.env.VITE_CHARACTERS_API_URL}/${params.id}/films`);
        const response = await fetch(`${import.meta.env.VITE_CHARACTERS_API_URL}/${params.id}`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        const fjson_response = await fresponse.json();
        setData(json_response);
        setFilmData(fjson_response);
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
                <div className="card-text">Height: {data.height}</div>
                <div className="card-text">Mass: {data.mass}</div>
                <div className="card-text">Born: {data.birth_year}</div>
                <div className="card-text">Films: </div>
                {filmdata.map((film) => (
                    <div key={film.id} div className="card-text">{film.title}</div>
                ))}
            </div>
        </div>
    );
};

export default Character;