import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";
import bcrypt from 'bcryptjs';

const usuario2 = Router();

usuario2.get(
  "/usuario/:id_usuario?",
  limitGrt(),
  validarToken,
  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id_usuario = req.params.id_usuario
      ? parseInt(req.params.id_usuario)
      : null; // Parsea el parámetro como un número entero si está presente
    try {
      const db = await con();
      const usuarios = db.collection("usuario");

      if (id_usuario !== null) {
        const result = await usuarios.findOne({ id_usuario }); // Encuentra un usuario por el id_usuario
        if (result) {
          res.send(result);
        } else {
          res.status(404).send("usuario no encontrado");
        }
      } else {
        const allusuarios = await usuarios.find({}).toArray(); // Obtiene todos los usuarios
        res.send(allusuarios);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);

usuario2.get(
  "/usuario/nombre/:nombre",
  limitGrt(),
  validarToken,
  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const nombre = req.params.nombre;
    try {
      const db = await con();
      const usuarios = db.collection("usuario");
      const matchingusuarios = await usuarios.find({ nombre }).toArray();
      if (matchingusuarios.length > 0) {
        res.send(matchingusuarios);
      } else {
        res
          .status(404)
          .send("usuarios no encontrados con el nombre especificado");
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);

usuario2.get(
  "/usuario/rol/:rol",
  limitGrt(),
  validarToken,
  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const rol = req.params.rol;
    try {
      const db = await con();
      const usuarios = db.collection("usuario");
      const matchingusuarios = await usuarios.find({ rol }).toArray();
      if (matchingusuarios.length > 0) {
        res.send(matchingusuarios);
      } else {
        res.status(404).send("usuarios no encontrados con el rol especificado");
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);

usuario2.post('/usuario', limitGrt(), validarToken, async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
  
    try {
      const db = await con();
      const usuarios = db.collection('usuario');
  
      // Encripta la contraseña antes de insertarla en la base de datos
      const hashedPassword = await bcrypt.hash(req.body.contraseña, 10); // 10 es el número de rondas de encriptación
  
      // Reemplaza la contraseña en el objeto req.body con la contraseña encriptada
      req.body.contraseña = hashedPassword;
  
      // Inserta el usuario en la base de datos con la contraseña encriptada
      const result = await usuarios.insertOne(req.body);
  
      if (result.insertedCount === 0) {
        throw new Error('No se pudo insertar el registro');
      }
      console.log('contraseña encriptada: ', hashedPassword);
      res.status(201).send(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });

usuario2.delete(
  "/usuario/:id_usuario",
  limitGrt(),
  validarToken,
  async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id_usuario = parseInt(req.params.id_usuario);
    try {
      const db = await con();
      const usuarios = db.collection("usuario");
      const result = await usuarios.deleteOne({ id_usuario });
      if (result.deletedCount === 1) {
        res.send("usuario eliminado correctamente");
      } else {
        res.status(404).send("usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);

usuario2.put('/usuario/:id_usuario', limitGrt(), validarToken, async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    
    const id_usuario = parseInt(req.params.id_usuario);
    const newData = req.body; // Los nuevos datos para actualizar el usuario
  
    try {
      const db = await con();
      const usuarios = db.collection('usuario');
  
      // Verifica si la nueva contraseña se proporcionó y la encripta solo si cambió
      if (newData.contraseña) {
        const existingUser = await usuarios.findOne({ id_usuario });
        if (existingUser && existingUser.contraseña !== newData.contraseña) {
          const hashedPassword = await bcrypt.hash(newData.contraseña, 10); // 10 es el número de rondas de encriptación
          newData.contraseña = hashedPassword;
        }
      }
  
      const result = await usuarios.updateOne(
        { id_usuario },
        { $set: newData }
      );
  
      if (result.matchedCount === 1) {
        res.send('Usuario actualizado correctamente');
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

export default usuario2;
