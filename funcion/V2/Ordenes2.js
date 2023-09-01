import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validationResult } from "express-validator";
import { validarToken } from "../../middleware_token/middlewareJWT.js";

const ordenes = Router();

ordenes.get("/orden",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const ordenes = db.collection("orden");
    const result = await ordenes.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los ordenes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Realizar la consulta por el id_Orden
ordenes.get("/orden/:id_Orden",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_Orden = parseInt(req.params.id_Orden); // Convertir el parámetro a número entero
    const db = await con();
    const ordenes = db.collection("orden");

    const result = await ordenes.findOne({ id_Orden });

    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    res.status(500).send("Error interno del servidor");
  }
});

ordenes.post("/orden",limitGrt(), validarToken, async(req, res)=>{
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  const {errors} = validationResult(req)
  if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
  let result;
  try {
      const db = await con();
      const orden = db.collection("orden");
      result = await orden.insertOne(req.body);
      if (result.insertedCount === 0) {
        throw new Error("No se pudo insertar el registro");
      }
      res.status(201).send(result);
  } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
  }
});

// Eliminar una orden por id_Orden
ordenes.delete("/orden/:id_Orden",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_Orden = parseInt(req.params.id_Orden); // Convertir el parámetro a número entero
    const db = await con();
    const ordenes = db.collection("orden");

    // Eliminar la orden por id_Orden
    const result = await ordenes.deleteOne({ id_Orden });

    if (result.deletedCount === 1) {
      res.send("Orden eliminada exitosamente");
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Actualizar una orden por id_Orden
ordenes.put("/orden/:id_Orden",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_Orden = parseInt(req.params.id_Orden); // Convertir el parámetro a número entero
    const updatedData = req.body; // Los datos actualizados se esperan en el cuerpo del request
    const db = await con();
    const ordenes = db.collection("orden");

    // Actualizar la orden por id_Orden
    const result = await ordenes.updateOne({ id_Orden }, { $set: updatedData });

    if (result.matchedCount === 1) {
      res.send("Orden actualizada exitosamente");
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default ordenes;
