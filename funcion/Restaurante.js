import { con } from "../db/atlas.js";
import { Router } from "express";
import DTO from "../middlewares/Restaurantes.js";

const restaurante = Router();

restaurante.post("/", DTO, async (req, res) => {
    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurantes"); 
        const nuevoRestaurante = req.body;
        const resultado = await restaurantes.insertOne(nuevoRestaurante);
        res.status(201).json({ mensaje: "Restaurante agregado exitosamente", id: resultado.insertedId });
    } catch (error) {
        console.error("Error al agregar el restaurante:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.get("/todos", async (req, res) => {
    try {
        const db = await con();
        const restaurantes = db.collection("restaurantes");
        const result = await restaurantes.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

restaurante.get("/nombre/:nombreRestaurante", async (req, res) => {
    const nombreRestaurante = req.params.nombreRestaurante;

    try {
        const db = await con();
        const restaurantes = db.collection("restaurantes");
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

restaurante.put("/nombre/:nombreRestaurante", DTO, async (req, res) => {
    const nombreRestaurante = req.params.nombreRestaurante;

    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurantes");
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

restaurante.delete("/nombre/:nombreRestaurante", async (req, res) => {
    const nombreRestaurante = req.params.nombreRestaurante;
    try {
        const db = await con(); 
        const restaurantes = db.collection("restaurantes");
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