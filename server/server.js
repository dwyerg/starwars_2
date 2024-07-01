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

app.get('/api/characters/:id', async (req, res) => { 
      try { 
        const tid = req.params.id;
        const character = await db.collection('characters').findOne({id:parseInt(tid)}); 
        res.json(character); 
      } 
      catch (err) { 
        res.status(500).json({ message: err.message }); 
      } });
app.get('/api/characters/:id/films', async (req, res) => { 
        try { 
          const tid = req.params.id;
          const films = await db.collection('films_characters').find({character_id:parseInt(tid)}).toArray();
          const film_ids= films.map(({film_id})=>film_id);
          const filmz = await db.collection('films').find({id:{$in:film_ids}}).toArray();
          res.json(filmz); 
        } 
        catch (err) { 
          res.status(500).json({ message: err.message }); 
        } });
app.get('/api/planets', async (req, res) => { 
          try { 
            const planets = await db.collection('planets').find().toArray(); 
            res.json(planets); 
          } 
          catch (err) { 
            res.status(500).json({ message: err.message }); 
          } });
app.get('/api/planets/:id', async (req, res) => { 
          try { 
              const tid = req.params.id;
              const planets = await db.collection('planets').findOne({id:parseInt(tid)}); 
              res.json(planets); 
            } 
            catch (err) { 
              res.status(500).json({ message: err.message }); 
            } });  
app.get('/api/planets/:id/characters', async (req, res) => { 
              try { 
                const tid = req.params.id;
                const characters = await db.collection('characters').find({homeworld:parseInt(tid)}).toArray();
                res.json(characters); 
              } 
              catch (err) { 
                res.status(500).json({ message: err.message }); 
              } });      
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});