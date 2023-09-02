import { SignJWT, jwtVerify } from "jose";
import { con } from "../db/atlas.js";
import dotenv from "dotenv";
dotenv.config();

const conexionDB = await con();

const crearToken = async (req, res) => {
  const encoder = new TextEncoder();

  const userInfo = decodeURIComponent(req.params.user);
  const [correo, contraseña] = userInfo.split("-");

  console.log("correo:", correo);
  console.log("contraseña:", contraseña);

  try {
    // Verificar si el correo y la contraseña existen en la colección "usuario"
    const usuarioData = await conexionDB
      .collection("usuario")
      .findOne({ correo, contraseña });

    if (!usuarioData) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Obtener el rol del usuario
    const rol = usuarioData.rol;
    // Crear el token con los permisos del rol
    const jwtConstructor = await new SignJWT({ rol }) // Configurar el rol en el token
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("10m")
      .sign(encoder.encode(process.env.JWT_SECRET));

    res.send(jwtConstructor);
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
  

// const validarToken = async (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ mensaje: "Token no proporcionado" });
//     }

//     try {
//         const encoder = new TextEncoder();
//         const jwtData = await jwtVerify( token,encoder.encode(process.env.JWT_SECRET));
//         const rol = jwtData.payload.rol;        // Obtener el rol del token
//         console.log("Rol obtenido:", rol); // Imprimir el rol en la consola
//         const urlParts = req.url.split("/");      // Obtener la colección de la URL
//         console.log("partes url:", urlParts[1]);

//         let coleccionIndex = urlParts.findIndex(part => part === "usuario" || part === "producto" || part === "repartidor"|| part === "orden"|| part === "restaurante"|| part === "pedido" || part === "rol");

//         if (coleccionIndex === -1) {
//             return res.status(400).json({ mensaje: "Colección no encontrada en la URL" });
//         }
//         const coleccion = urlParts[coleccionIndex];
//         console.log("Colección obtenida:", coleccion); // Imprimir la colección en la consola
//         const rolesData = await conexionDB.collection('rol').findOne({ nombre_rol: rol });// Buscar el rol en la colección roles
//         if (!rolesData) {
//             return res.status(401).json({ mensaje: "Rol no encontrado" });
//         }
//         const accesoColecciones = rolesData.acceso_rol;
//         console.log("acceso: ", accesoColecciones) //[ 'usuario', 'producto', 'orden', 'restaurante', 'roles', 'pedido' ]

//         if (accesoColecciones.some(acceso => acceso === coleccion)) {
//             return res.status(403).json({ mensaje: "Acceso no autorizado a la colección" });
//         }
//         const metodoActual = req.method;// Verificar si el método actual está permitido para el rol y la colección
//         if (!accesoColecciones[coleccion].includes(metodoActual)) {
//             return res.status(403).json({ mensaje: "Método no permitido para este rol y colección" });
//         }

//         // Usuario tiene acceso al método y la colección específicos
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ mensaje: "Token inválido" });
//     }
// }

export { crearToken, validarToken };
