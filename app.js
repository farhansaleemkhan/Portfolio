import express from 'express';
import routes from '../portfolio/routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// app.use(cors());

app.use(express.json());

app.use('/', routes);

export default app;