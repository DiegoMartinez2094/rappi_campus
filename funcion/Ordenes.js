import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";

const ordenes = Router();

ordenes.get("/todas",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const ordenes = db.collection("ordenes");
    const result = await ordenes.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los ordenes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Realizar la consulta por el idOrden
ordenes.get("/:idOrden",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const idOrden = parseInt(req.params.idOrden); // Convertir el parámetro a número entero
    const db = await con();
    const ordenes = db.collection("ordenes");

    const result = await ordenes.findOne({ idOrden });

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

// Eliminar una orden por idOrden
ordenes.delete("/:idOrden",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const idOrden = parseInt(req.params.idOrden); // Convertir el parámetro a número entero
    const db = await con();
    const ordenes = db.collection("ordenes");

    // Eliminar la orden por idOrden
    const result = await ordenes.deleteOne({ idOrden });

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

// Actualizar una orden por idOrden
ordenes.put("/:idOrden",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const idOrden = parseInt(req.params.idOrden); // Convertir el parámetro a número entero
    const updatedData = req.body; // Los datos actualizados se esperan en el cuerpo del request
    const db = await con();
    const ordenes = db.collection("ordenes");

    // Actualizar la orden por idOrden
    const result = await ordenes.updateOne({ idOrden }, { $set: updatedData });

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
