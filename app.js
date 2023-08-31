import dotenv from "dotenv";
import express from "express";
import versionRoutes from "express-routes-versioning";
import { check } from "express-validator";
import { crearToken } from "./middleware_token/middlewareJWT.js";

import restaurante from "./funcion/V2/Restaurante2.js";
import restaurante1 from "./funcion/V1/Restaurante.js";
import producto from "./funcion/V1/Productos.js";
import producto2 from "./funcion/V2/Productos2.js";
import usuario from "./funcion/V1/usuario.js";
import usuario2 from "./funcion/V2/usuario2.js";
import ordenes from "./funcion/V2/Ordenes2.js";
import ordenes1 from "./funcion/V1/ordenes.js";
import pedido from "./funcion/V1/pedido.js";
import pedido2 from "./funcion/V2/pedido2.js";

dotenv.config();
const app = express();
const versionRoute = versionRoutes();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);

app.use((req, res, next) => {
  req.version = req.headers["accept-version"]|| "1.0.0"; //para que si no se pone la version, por defecto tome la 1.0.0
  next();
});

app.get("/login/:user", crearToken);

app.use(
  "/usuario",
  [
    check("id_usuario")
      .notEmpty()
      .withMessage("el id_usuario es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("El id_usuario debe ser numérico sin letras")
      .toInt(),

    check("nombre")
      .notEmpty()
      .withMessage("el nombre es obligatorio")
      .isString()
      .withMessage("el nombre debe ser string"),

    check("correo")
      .notEmpty()
      .withMessage("El correo es obligatorio")
      .isString()
      .withMessage("El correo debe ser un string")
      .isEmail()
      .withMessage("El correo debe ser una dirección de correo válida"),

    check("contraseña")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .custom((value) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value))
      .withMessage(
        "La contraseña debe contener al menos 8 caracteres, incluyendo números y letras"
      ),

    check("rol")
      .notEmpty()
      .withMessage("el rol es obligatorio")
      .custom((value) =>
        ["cliente", "repartidor"].includes(value.toLowerCase())
      )
      .withMessage(
        "rol no válido debee ser alguno de estos: repartidor o cliente"
      ),

    check("telefono")
      .notEmpty()
      .withMessage("el telefono es obligatorio")
      .isString()
      .withMessage("el telefono debe ser string"),

    check("direccion")
      .notEmpty()
      .withMessage("la direccion es obligatorio")
      .isString()
      .withMessage("la direccion debe ser string"),
  ],

  versionRoute({
    "1.0.0": usuario,
    "2.0.0": usuario2,
  })
);

app.use(
  "/producto",

  [
    check("id_Producto")
      .notEmpty()
      .withMessage("el id_Producto es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("El id_Producto debe ser numérico sin letras")
      .toInt(),

    check("nombre_Producto")
      .notEmpty()
      .withMessage("el nombre_Producto es obligatorio")
      .isString()
      .withMessage("el nombre_Producto debe ser string"),

    check("descripcion_Producto")
      .notEmpty()
      .withMessage("la descripcion_Producto es obligatoria")
      .isString()
      .withMessage("la descripcion_Producto debe ser tipo string"),

    check("precio_und")
      .notEmpty()
      .withMessage("el precio_und es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("el precio_und debe ser numérico sin letras")
      .toInt(),
  ],
  versionRoute({
    "1.0.0": producto,
    "2.0.0": producto2,
  })
);

app.use(
  "/orden",

  [
    check("id_Orden")
      .notEmpty()
      .withMessage("El id_Orden es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("El id_Orden debe ser numérico sin letras")
      .toInt(),

    check("fecha_Creacion")
      .notEmpty()
      .withMessage("La fecha_Creacion es obligatoria")
      .isISO8601()
      .withMessage("El formato de fecha_Creacion no es válido"),

    check("cliente")
      .isObject()
      .withMessage("El cliente debe ser un objeto")
      .custom(
        (value) =>
          value.nombre_Cliente &&
          value.direccion_Cliente &&
          value.telefono_Cliente
      )
      .withMessage(
        "El objeto cliente debe contener nombre_Cliente, direccion_Cliente y telefono_Cliente"
      ),

    check("producto")
      .isObject()
      .withMessage("El producto debe ser un objeto")
      .custom(
        (value) =>
          value.id &&
          value.nombre_Producto &&
          value.precio_und &&
          value.cantidad_Producto
      )
      .withMessage(
        "El objeto producto debe contener id, nombre_Producto, precio_und y cantidad_Producto"
      ),

    check("pago")
      .isObject()
      .withMessage("El pago debe ser un objeto")
      .custom(
        (value) =>
          value.monto &&
          value.metodo_Pago &&
          value.costo_domicilio &&
          value.pago_total
      )
      .withMessage(
        "El objeto pago debe contener monto, metodo_Pago, costo_domicilio y pago_total"
      ),

    check("estado").notEmpty().withMessage("El estado es obligatorio"),

    check("instrucciones_Especiales")
      .notEmpty()
      .withMessage("Las instrucciones_Especiales son obligatorias"),

    check("repartidor_Asignado")
      .isObject()
      .withMessage("El repartidor_Asignado debe ser un objeto")
      .custom(
        (value) =>
          value.nombre_Repartidor &&
          value.telefono_Repartidor &&
          value.vehiculo &&
          value.nivel_repartidor
      )
      .withMessage(
        "El objeto repartidor_Asignado debe contener nombre_Repartidor, telefono_Repartidor, vehiculo y nivel_repartidor"
      ),

    check("fecha_Entrega")
      .notEmpty()
      .withMessage("La fecha_Entrega es obligatoria")
      .isISO8601()
      .withMessage("El formato de fecha_Entrega no es válido"),

    check("calificacion")
      .notEmpty()
      .withMessage("La calificacion es obligatoria")
      .custom((value) => /^[1-5]$/.test(value))
      .withMessage("La calificacion debe ser un número entre 1 y 5")
      .toFloat(),

    check("restaurante")
      .isObject()
      .withMessage("El restaurante debe ser un objeto")
      .custom((value) => value.nombre && value.telefono_Restaurante)
      .withMessage(
        "El objeto restaurante debe contener nombre y telefono_Restaurante"
      ),
  ],

  versionRoute({
    "1.0.0": ordenes1,
    "2.0.0": ordenes,
  })
);

app.use(
  "/restaurante",

  [
    check("id_Restaurante")
      .notEmpty()
      .withMessage("El id_Restaurante es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("El id_Restaurante debe ser numérico sin letras")
      .toInt(),

    check("nombre_Restaurante")
      .notEmpty()
      .withMessage("El nombre_Restaurante es obligatorio")
      .isString()
      .withMessage("El nombre_Restaurante debe ser string"),

    check("telefono_Restaurante")
      .notEmpty()
      .withMessage("El telefono_Restaurante es obligatorio")
      .isString()
      .withMessage("El nombre_Producto debe ser string"),

    check("direccion_Restaurante")
      .notEmpty()
      .withMessage("La direccion_Restaurante es obligatorio")
      .isString()
      .withMessage("La direccion_Restaurante debe ser string"),

    check("calificacion_Restaurante")
      .notEmpty()
      .withMessage("La calificacion_Restaurante es obligatorio")
      .custom((value) => /^[1-5]$/.test(value))
      .withMessage("La calificacion_Restaurante debe ser un número entre 1 y 5")
      .toInt(),
  ],

  versionRoute({
    "1.0.0": restaurante,
    "2.0.0": restaurante1
  })
);

app.use(
  "/pedido",
  [
    check("Id_pedido")
      .notEmpty()
      .withMessage("El Id_pedido es obligatorio")
      .custom((value) => /^\d+$/.test(value))
      .withMessage("El Id_pedido debe ser numérico sin letras")
      .toInt(),

    check("cliente.nombre_Cliente")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio")
      .isString()
      .withMessage("El nombre del cliente debe ser string"),

    check("cliente.direccion_Cliente")
      .notEmpty()
      .withMessage("La dirección del cliente es obligatoria")
      .isString()
      .withMessage("La dirección debe ser string"),

    check("cliente.telefono_Cliente")
      .notEmpty()
      .withMessage("El teléfono del cliente es obligatorio"),

    check("producto.id")
      .notEmpty()
      .withMessage("El ID del producto es obligatorio")
      .isNumeric()
      .withMessage("El ID del producto debe ser numérico"),

    check("producto.nombre_Producto")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio"),

    check("producto.precio_und")
      .notEmpty()
      .withMessage("El precio del producto es obligatorio")
      .isNumeric()
      .withMessage("El precio del producto debe ser numérico"),

    check("producto.cantidad_Producto")
      .notEmpty()
      .withMessage("La cantidad del producto es obligatoria")
      .isInt({ min: 1 })
      .withMessage(
        "La cantidad del producto debe ser un número entero mayor a 0"
      ),

    check("pago.monto")
      .notEmpty()
      .withMessage("El monto del pago es obligatorio")
      .isNumeric()
      .withMessage("El monto del pago debe ser numérico"),

    check("pago.metodo_Pago")
      .notEmpty()
      .withMessage("El método de pago es obligatorio")
      .custom((value) =>
        ["trajeta debito", "trajeta credito", "efectivo", "bono"].includes(
          value.toLowerCase()
        )
      )
      .withMessage(
        "método de pago no válido debee ser alguno de estos: trajeta debito,trajeta credito, efectivo, bono "
      ),

    check("pago.costo_domicilio")
      .notEmpty()
      .withMessage("El costo de domicilio es obligatorio")
      .isNumeric()
      .withMessage("El costo de domicilio debe ser numérico"),

    check("pago.pago_total")
      .notEmpty()
      .withMessage("El pago total es obligatorio")
      .isNumeric()
      .withMessage("El pago total debe ser numérico"),

    check("instrucciones_Especiales").optional(),
  ],

  versionRoute({
    "1.0.0": pedido,
    "2.0.0": pedido2,
  })
);

app.listen(config.port, config.hostname, () => {
  console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});
