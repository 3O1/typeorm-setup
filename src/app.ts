import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { AppDataSource } from './db/data-source';
import userRouter from './routes/user.routes';
import cors from 'cors';

dotenv.config({ path: '.env.dev' });

// Initialize the database connection and start the server
AppDataSource.initialize()
  .then(async () => {
    // Create a new Express app and set the port
    const app = express();
    const PORT = process.env.PORT;

    // Configure middleware
    app.use(express.json()); // Parse JSON requests
    app.use(morgan('dev')); // Log HTTP requests
    app.use(cors()); // Enable CORS
    app.use(bodyParser.json()); // Parse JSON request bodies

    // Mount the user router at the '/users' endpoint
    app.use('/users', userRouter);

    // Define a default route that returns 200
    app.get('/', (_, res) => {
      res.sendStatus(200);
    });

    // Start the server and log the URL
    app.listen(PORT, async () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // If there is an error, log it to the console
    console.log('failure');
    console.log(error);
  });
