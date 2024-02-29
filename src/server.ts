import app from "./app"
import connectToDatabase from './config/config';
import dotenv from 'dotenv';

dotenv.config()

const port: number = parseInt(process.env.PORT!,10 );
connectToDatabase()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });