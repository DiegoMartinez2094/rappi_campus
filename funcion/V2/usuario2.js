import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from '../../middleware_token/middlewareJWT.js';

const usuario2 = Router();

usuario2.get("/usuario/:id_usuario?", limitGrt(),validarToken, async (req, res) => {
    if (!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_usuario = req.params.id_usuario ? parseInt(req.params.id_usuario) : null; // Parsea el parámetro como un número entero si está presente
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
});

usuario2.get("/usuario/nombre/:nombre", limitGrt(),validarToken, async (req, res) => {
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
            res.status(404).send("usuarios no encontrados con el nombre especificado");
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
});

usuario2.get("/usuario/rol/:rol", limitGrt(),validarToken, async (req, res) => {
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
});

usuario2.post("/usuario",limitGrt(), async(req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
let resul;
try { 
    const db = await con();
    const usuarios = db.collection("usuario");
    resul = await usuarios.insertOne(req.body);
    res.status(201).send(resul);
} catch (error) {
    console.log(error);
    res.send();
}
});    

usuario2.delete("/usuario/:id_usuario",limitGrt(),validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
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
});

usuario2.put("/usuario/:id_usuario",limitGrt(),validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
      const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    const id_usuario = parseInt(req.params.id_usuario);
    const newData = req.body; // Los nuevos datos para actualizar el usuario
    try {
        const db = await con();
        const usuarios = db.collection("usuario");
        const result = await usuarios.updateOne({ id_usuario }, { $set: newData });
        if (result.matchedCount === 1) {
            res.send("usuario actualizado correctamente");
        } else {
            res.status(404).send("usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default usuario2;