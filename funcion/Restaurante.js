import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";
import { validarToken } from "../middleware_token/middlewareJWT.js";


const restaurante = Router();

restaurante.post("/",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurante"); 
        const nuevoRestaurante = req.body;
        const resultado = await restaurantes.insertOne(nuevoRestaurante);
        res.status(201).json({ mensaje: "Restaurante agregado exitosamente", id: resultado.insertedId });
    } catch (error) {
        console.error("Error al agregar el restaurante:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.get("/todos",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const restaurantes = db.collection("restaurante");
        const result = await restaurantes.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.get("/nombre/:nombreRestaurante",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const nombreRestaurante = req.params.nombreRestaurante;

    try {
        const db = await con();
        const restaurantes = db.collection("restaurante");
        const result = await restaurantes.findOne({ nombre: { $regex: nombreRestaurante, $options: "i" } });

        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Restaurante no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el restaurante por nombre:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.put("/nombre/:nombreRestaurante",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const nombreRestaurante = req.params.nombreRestaurante;

    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurante");
        const datosActualizados = req.body;
        const resultado = await restaurantes.updateOne(
            { nombre: nombreRestaurante },
            { $set: datosActualizados }
        );

        if (resultado.matchedCount > 0) {
            res.send("Restaurante actualizado exitosamente");
        } else {
            res.status(404).send("Restaurante no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el restaurante:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.delete("/nombre/:nombreRestaurante",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const nombreRestaurante = req.params.nombreRestaurante;
    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurante");
        const resultado = await restaurantes.deleteOne({ nombre: nombreRestaurante });
        if (resultado.deletedCount > 0) {
            res.send("Restaurante eliminado exitosamente");
        } else {
            res.status(404).send("Restaurante no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el restaurante:", error);
        res.status(500).send("Error interno del servidor");
    }
});


export default restaurante;