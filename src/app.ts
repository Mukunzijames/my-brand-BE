import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/blog';
dotenv.config();

const app = express();

const mongoUrl = process.env.MONGODB_URL!;
const port = process.env.PORT!;

mongoose.connect(mongoUrl)
  .then(() => {
    app.use(express.json())
    app.use("/api",route)
    console.log(`MongoDB connected`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

export default app; 
