import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";

const rol2 = Router();

rol2.get("/rol",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const db = await con();
      const roles = db.collection("rol");
      const result = await roles.find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      res.status(500).send("Error interno del servidor");
    }
});

rol2.get("/rol/:Id_rol",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const Id_rol = parseInt(req.params.Id_rol); // Convertir el parámetro a número entero
      const db = await con();
      const roles = db.collection("rol");
      const result = await roles.findOne({ Id_rol });
  
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("roles no encontrados");
      }
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      res.status(500).send("Error interno del servidor");
    }
});

rol2.post("/rol",limitGrt(), validarToken, async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const roles = db.collection("rol");
        result = await roles.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }
  });

rol2.put("/rol/:Id_rol",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const Id_rol = parseInt(req.params.Id_rol); // Convertir el parámetro a número entero
      const updatedData = req.body; // Los datos actualizados se esperan en el cuerpo del request
      const db = await con();
      const roles = db.collection("rol");
  
      // Actualizar la pedido por Id_rol
      const result = await roles.updateOne({ Id_rol }, { $set: updatedData });
  
      if (result.matchedCount === 1) {
        res.send("rol actualizada exitosamente");
      } else {
        res.status(404).send("rol no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

// Eliminar una rol por Id_rol
rol2.delete("/rol/:Id_rol",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const Id_rol = parseInt(req.params.Id_rol); // Convertir el parámetro a número entero
      const db = await con();
      const roles = db.collection("rol");
  
      // Eliminar el rol por Id_rol
      const result = await roles.deleteOne({ Id_rol });
  
      if (result.deletedCount === 1) {
        res.send("rol eliminado exitosamente");
      } else {
        res.status(404).send("rol no encontrada");
      }
    } catch (error) {
      console.error("Error al eliminar el rol:", error);
      res.status(500).send("Error interno del servidor");
    }
});

export default rol2;