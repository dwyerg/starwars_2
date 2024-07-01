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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});