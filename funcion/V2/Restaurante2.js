import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validationResult } from "express-validator";
import { validarToken } from "../../middleware_token/middlewareJWT.js";


const restaurante = Router();

restaurante.post("/restaurante",limitGrt(), validarToken, async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const db = await con();
        const restaurantes = db.collection("restaurante");
        result = await restaurantes.insertOne(req.body);
        if (result.insertedCount === 0) {
          throw new Error("No se pudo insertar el registro");
        }
        res.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

restaurante.get("/restaurante/todos",limitGrt(), validarToken, async (req, res) => {
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

restaurante.get("/restaurante/nombre/:nombreRestaurante",limitGrt(), validarToken, async (req, res) => {
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

restaurante.put("/restaurante/nombre/:nombre_Restaurante",limitGrt(), validarToken, async (req, res) => {
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

restaurante.delete("/restaurante/nombreRestaurante/:nombre_Restaurante",limitGrt(), validarToken, async (req, res) => {
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