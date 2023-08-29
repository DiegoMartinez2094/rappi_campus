import dotenv from "dotenv";
import express from "express";
import versionRoutes from 'express-routes-versioning';
import {check} from 'express-validator'
import { crearToken } from './middleware_token/middlewareJWT.js';

import cliente from "./funcion/V1/Cliente.js";
import cliente2 from "./funcion/V2/Cliente2.js";
import orden from "./funcion/Ordenes.js";
import restaurante from "./funcion/Restaurante.js";
import repartidor from "./funcion/V1/Repartidor.js";
import repartidor2 from "./funcion/V2/Repartidor2.js";
import producto from "./funcion/V1/Productos.js"
import producto2 from "./funcion/V2/Productos2.js"

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use((req, res, next) => {
   req.version = req.headers['accept-version'];
   next();
});

app.get('/token/:rol', crearToken);

app.use('/cliente',
[check("id_Cliente")
.notEmpty().withMessage('el id_Cliente es obligatorio')
.custom(value => /^\d+$/.test(value)).withMessage('El id_Cliente debe ser numérico sin letras')
.toInt(),

check("nombre_Cliente")
.notEmpty().withMessage('el nombre_Cliente es obligatorio')
.isString().withMessage('el nombre_Cliente debe ser string'),

check("direccion_Cliente")
.notEmpty().withMessage('la direccion_Cliente es obligatorio')
.isString().withMessage('la direccion_Cliente debe ser string'),

check("telefono_Cliente")
.notEmpty().withMessage('el telefono_Cliente es obligatorio')
.isString().withMessage('el telefono_Cliente debe ser string'),

check("nivel_Cliente")
.notEmpty().withMessage('el nivel_Cliente es obligatorio')
.custom((value) => ['diamante', 'oro', 'plata', 'bronce'].includes(value.toLowerCase())).withMessage('nivel_Cliente no válido debee ser alguno de estos: diamante, oro, plata, bronce'),
],

versionRoute({
   "1.0.0": cliente,
   "2.0.0": cliente2,
}));

app.use('/repartidor',

[check("id_Repartidor")
.notEmpty().withMessage('el id_Repartidor es obligatorio')
.custom(value => /^\d+$/.test(value)).withMessage('El id_Repartidor debe ser numérico sin letras')
.toInt(),

check("nombre_Repartidor")
.notEmpty().withMessage('el nombre_Repartidor es obligatorio')
.isString().withMessage('el nombre_Repartidor debe ser string'),

check("telefono_Repartidor")
.notEmpty().withMessage('el telefono_Repartidor es obligatorio')
.isString().withMessage('el telefono_Repartidor debe ser string'),

check("vehiculo")
.notEmpty().withMessage('el vehiculo es obligatorio')
.custom((value) => ['caminando', 'moto', 'bicicleta', 'auto'].includes(value.toLowerCase())).withMessage('vehiculo no válido debe ser alguno de estos: caminando, moto, bicicleta, auto'),

check("nivel_repartidor")
.notEmpty().withMessage('el nivel_repartidor es obligatorio')
.custom((value) => ['diamante', 'oro', 'plata', 'bronce'].includes(value.toLowerCase())).withMessage('nivel_repartidor no válido debee ser alguno de estos: diamante, oro, plata, bronce'),
], versionRoute({
   "1.0.0": repartidor,
   "2.0.0": repartidor2,
}));

app.use('/producto',

[check("id_Producto")
.notEmpty().withMessage('el id_Producto es obligatorio')
.custom(value => /^\d+$/.test(value)).withMessage('El id_Producto debe ser numérico sin letras')
.toInt(),

check("nombre_Producto")
.notEmpty().withMessage('el nombre_Producto es obligatorio')
.isString().withMessage('el nombre_Producto debe ser string'),

check("descripcion_Producto")
.notEmpty().withMessage('la descripcion_Producto es obligatoria')
.isString().withMessage('la descripcion_Producto debe ser tipo string'),

check("precio_und")
.notEmpty().withMessage('el precio_und es obligatorio')
.custom(value => /^\d+$/.test(value)).withMessage('el precio_und debe ser numérico sin letras')
.toInt()], versionRoute({
   "1.0.0": producto,
   "2.0.0": producto2,
}));

app.use('/orden', versionRoute({
   "1.0.0": orden,
}));

app.use('/restaurante', versionRoute({
   "1.0.0": restaurante,
}));

app.listen(config.port, config.hostname, () => {
    console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});