import dotenv from "dotenv";
import express from "express";
import versionRoutes from 'express-routes-versioning';

import cliente from "./funcion/Cliente.js"
import cliente2 from "./funcion/Cliente2.js"
import orden from "./funcion/Ordenes.js"
import restaurante from "./funcion/Restaurante.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use((req, res, next) => {
   req.version = req.headers['accept-version'];
   next();
});


app.use('/clientes', versionRoute({
   "1.0.0": cliente,
   "1.0.1": cliente2,
}));
app.use('/ordenes', versionRoute({
   "1.0.0": orden,
}));

app.use('/restaurantes', versionRoute({
   "1.0.0": restaurante,
}));

app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});