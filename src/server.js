import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import connectDB from './database/connection.js';

import usersRouter from './routers/usersRouter.js';

const app = express();

// db connection
connectDB();

// cors
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

// define html paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

// set up views engine
app.set('view engine', 'pug');
app.set('views', viewsPath);

// setup directory to serve static assets
app.use(express.static(publicDirectoryPath));

// home page
app.get('/', (req, res) => {
  res.render('index');
});

// swagger
const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
