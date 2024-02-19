import express from 'express';
import connectToDatabase from './config/config';
import dotenv from 'dotenv';
import route from './routes';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT!, 10);

connectToDatabase()

app.use(express.json());

app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;