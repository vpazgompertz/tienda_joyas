import express from 'express';
import { logger } from 'logger-express';
import cors from 'cors';
import joyasRouter from './src/router/joyasRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger());

app.use('/', joyasRouter);

app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});