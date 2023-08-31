import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";

const pedido2 = Router();

pedido2.get("/pedido",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const pedidos = db.collection("pedido");
    const result = await pedidos.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Realizar la consulta por el id_pedido
pedido2.get("/pedido/:id_pedido",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_pedido = parseInt(req.params.id_pedido); // Convertir el parámetro a número entero
    const db = await con();
    const pedidos = db.collection("pedido");
    const result = await pedidos.findOne({ id_pedido });

    if (result) {
      res.send(result);
    } else {
      res.status(404).send("pedido no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});

pedido2.post("/pedido",limitGrt(), validarToken, async(req, res)=>{
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  const {errors} = validationResult(req)
  if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
  let result;
  try {
      const pedidos = db.collection("pedido");
      result = await pedidos.insertOne(req.body);
      res.status(201).send(result);
  } catch (error) {
      console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
      res.send();
  }
});

// Eliminar una pedido por id_pedido
pedido2.delete("/pedido/:id_pedido",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_pedido = parseInt(req.params.id_pedido); // Convertir el parámetro a número entero
    const db = await con();
    const pedidos = db.collection("pedido");

    // Eliminar la pedido por id_pedido
    const result = await pedidos.deleteOne({ id_pedido });

    if (result.deletedCount === 1) {
      res.send("pedido eliminada exitosamente");
    } else {
      res.status(404).send("pedido no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Actualizar una pedido por id_pedido
pedido2.put("/pedido/:id_pedido",limitGrt(), validarToken, async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id_pedido = parseInt(req.params.id_pedido); // Convertir el parámetro a número entero
    const updatedData = req.body; // Los datos actualizados se esperan en el cuerpo del request
    const db = await con();
    const pedidos = db.collection("pedido");

    // Actualizar la pedido por id_pedido
    const result = await pedidos.updateOne({ id_pedido }, { $set: updatedData });

    if (result.matchedCount === 1) {
      res.send("pedido actualizada exitosamente");
    } else {
      res.status(404).send("pedido no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default pedido2;
