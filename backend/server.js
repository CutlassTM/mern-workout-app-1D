import 'dotenv/config'; // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workouts.js'; // Ensure to include the .js extension
import cors from "cors";

//Require cors
const cors = require("cors");

// Express app
const app = express();

// Allow requests from all origins (for development only)
app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Listen on port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
