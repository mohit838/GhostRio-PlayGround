import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connect from './database/db.js';
import userRouters from './routes/userRoutes.js';

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

/* ALL ROUTES */
app.use('/api', userRouters);

/* MONGOOSE AND SERVER SETUP */
const PORT = process.env.PORT || 5000;

connect().then(() => {
  app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
});
