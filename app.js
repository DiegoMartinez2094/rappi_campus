import dotenv from "dotenv";
import express from "express";
import versionRoutes from 'express-routes-versioning';
import {check} from 'express-validator'

import cliente from "./funcion/Cliente.js";
import cliente2 from "./funcion/Cliente2.js";
import orden from "./funcion/Ordenes.js";
import restaurante from "./funcion/Restaurante.js";
import repartidor from "./funcion/Repartidor.js";
import producto from "./funcion/Productos.js"

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use((req, res, next) => {
   req.version = req.headers['accept-version'];
   next();
});



app.use('/clientes',
[check("idCliente")
.notEmpty().withMessage('el idCliente es obligatorio')
.custom(value => /^\d+$/.test(value)).withMessage('El idCliente debe ser numérico')
.toInt()],

[check("nombre")
.notEmpty().withMessage('el nombre es obligatorio')
.isString().withMessage('el nombre debe ser string')],

[check("direccion")
.notEmpty().withMessage('la direccion es obligatorio')
.isString().withMessage('la direccion debe ser string')],

[check("telefono")
.notEmpty().withMessage('el telefono es obligatorio')
.isString().withMessage('el telefono debe ser string')],

[check("nivel")
.notEmpty().withMessage('el nivel es obligatorio')
.custom((value) => ['diamante', 'oro', 'plata', 'bronce'].includes(value.toLowerCase())).withMessage('nivel no válido'),
],

versionRoute({
   "1.0.0": cliente,
   "1.0.1": cliente2,
}));

app.use('/repartidor', versionRoute({
   "1.0.0": repartidor,
}));

app.use('/producto', versionRoute({
   "1.0.0": producto,
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