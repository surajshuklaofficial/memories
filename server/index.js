import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { postRoutes, userRoutes } from './routes/index.js';

const app = express();
dotenv.config();

// to send request properly
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postRoutes); 
app.use('/users', userRoutes); 

// connecting server application with database
// const CONNECTION_URL = 'mongodb+srv://dummysingh2023april:DUMMY123@cluster0.hmdvgdd.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001; // heroku automatically populate environmental variable called PORT

// connection with database
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
