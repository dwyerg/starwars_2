import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express'

const app = express();
const PORT = 3000;
app.use(cors());
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const client = await MongoClient.connect(url);
const db = client.db(dbName);

app.get('/api/characters', async (req, res) => { 
    try { 
      const characters = await db.collection('characters').find().toArray(); 
      res.json(characters); 
    } 
    catch (err) { 
      res.status(500).json({ message: err.message }); 
    } });

app.get('/api/films', async (req, res) => { 
    try { 
        const films = await db.collection('films').find().toArray(); 
        res.json(films); 
    } 
    catch (err) { 
        res.status(500).json({ message: err.message }); 
    } });

app.get('/api/films/:id', async (req, res) => {
    try {
        const filmId = req.params.id;
        const film = await db.collection('films').findOne({ id: parseInt(filmId) });
        
        if (film) {
            res.json(film);
        } else {
            res.status(404).json({ message: 'Film not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const filmId = req.params.id;
        const filmCharacters = await db.collection('films_characters').find({film_id: parseInt(filmId) }).toArray();
        const characterIds = filmCharacters.map(fc => fc.character_id);
        const characters = await db.collection('characters').find({ id: { $in: characterIds } }).toArray();

        res.json(characters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const filmId = req.params.id;
        const filmPlanets = await db.collection('films_planets').find({film_id: parseInt(filmId) }).toArray();
        const planetIds = filmPlanets.map(fc => fc.planet_id);
        const planets = await db.collection('planets').find({ id: { $in: planetIds } }).toArray();

        res.json(planets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const planetId = req.params.id;
        const planetFilms = await db.collection('films_planets').find({planet_id: parseInt(planetId) }).toArray();
        const filmIds = planetFilms.map(fc => fc.film_id);
        const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();

        res.json(films);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});