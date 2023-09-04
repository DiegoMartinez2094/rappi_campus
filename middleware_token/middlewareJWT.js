import { SignJWT, jwtVerify } from "jose";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

import { con } from "../db/atlas.js";
dotenv.config();

const conexionDB = await con();

const crearToken = async (req, res) => {
  const encoder = new TextEncoder();
  const userInfo = decodeURIComponent(req.params.user);
  const [correo, contraseñaSinEncriptar] = userInfo.split("-");

  console.log("correo:", correo);
  console.log("contraseñaSinEncriptar:", contraseñaSinEncriptar);
  console.log("contraseñaEncriptada: ", await bcrypt.hash(contraseñaSinEncriptar, 10));
  try {
    // Buscar el usuario por correo en la colección "usuario"
    const usuarioData = await conexionDB.collection("usuario").findOne({ correo });

    if (!usuarioData) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Obtener la contraseña encriptada almacenada en la base de datos
    const contraseñaAlmacenada = usuarioData.contraseña;

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const contraseñaValida = await bcrypt.compare(contraseñaSinEncriptar, contraseñaAlmacenada);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // La contraseña es válida, puedes generar el token aquí

    // Obtener el rol del usuario
    const rol = usuarioData.rol;
    // Crear el token con los permisos del rol
    const jwtConstructor = await new SignJWT({ rol }) // Configurar el rol en el token
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("10m")
      .sign(encoder.encode(process.env.JWT_SECRET));

    // Enviar el token como respuesta JSON
    res.json({ token: jwtConstructor });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};


const validarToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }
  
    try {
      const encoder = new TextEncoder();
      const jwtData = await jwtVerify(
        token,
        encoder.encode(process.env.JWT_SECRET)
      );
      const rol = jwtData.payload.rol;
      console.log("Rol obtenido:", rol);
  
      const urlParts = req.url.split("/");
      console.log("partes url:", urlParts[1]);
  
      let coleccionIndex = urlParts.findIndex(
        (part) =>
          part === "usuario" ||
          part === "producto" ||
          part === "repartidor" ||
          part === "orden" ||
          part === "restaurante" ||
          part === "pedido" ||
          part === "rol"
      );
  
      if (coleccionIndex === -1) {
        return res
          .status(400)
          .json({ mensaje: "Colección no encontrada en la URL" });
      }
  
      const coleccion = urlParts[coleccionIndex];
      console.log("Colección obtenida:", coleccion);
  
      const rolesData = await conexionDB.collection("rol").findOne({ nombre_rol: rol });
      if (!rolesData) {
        return res.status(401).json({ mensaje: "Rol no encontrado" });
      }
      const accesoColecciones = rolesData.acceso_rol;
      console.log("accesoColecciones: ", accesoColecciones); //OK
  
      if (accesoColecciones.hasOwnProperty(coleccion)) {
        const metodoActual = req.method;
        console.log("metodoActual: ", metodoActual); //OK
  
        const metodosPermitidos = accesoColecciones[coleccion];
        console.log("metodosPermitidos: ", metodosPermitidos);
  
        if (
          Array.isArray(metodosPermitidos) &&
          metodosPermitidos.includes(metodoActual)
        ) {
          // El usuario tiene acceso a la colección y al método
          next();
        } else {
          return res
            .status(403)
            .json({ mensaje: "Método no permitido para este rol y colección" });
        }
      } else {
        return res
          .status(403)
          .json({ mensaje: "Acceso no autorizado a la colección" });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ mensaje: "Token inválido" });
    }
  };

export { crearToken, validarToken };