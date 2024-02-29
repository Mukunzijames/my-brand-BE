import express from 'express';

import dotenv from 'dotenv';
import route from './routes';
import swaggerUi from "swagger-ui-express"
import swaggerDocuments from "./swagger.json"

dotenv.config();

const app = express();




app.use(express.json());

app.use("/api", route);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));




export default app;