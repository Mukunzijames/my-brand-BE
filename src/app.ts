import express from 'express';
import connectToDatabase from './config/config';
import dotenv from 'dotenv';
import route from './routes';
import swaggerUi from "swagger-ui-express"
import swaggerDocuments from "./swagger.json"

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT!, );

connectToDatabase()

app.use(express.json());

app.use("/api", route);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;