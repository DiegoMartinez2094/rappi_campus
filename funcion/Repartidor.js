import { con } from "../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../limit/config.js";


const repartidor = Router();
const db = await con();

repartidor.get("/",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const repartidor = db.collection("repartidor");
        const result = await repartidor.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los repartidores:", error);
        res.status(500).send("Error interno del servidor");
    }
});

repartidor.post("/",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const repartidor = db.collection("repartidor");
        result = await repartidor.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }
});

repartidor.put("/:id_Repartidor",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_Repartidor = parseInt(req.params.id_Repartidor);
    const newData = req.body; 
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    try {
        const db = await con();
        const repartidor = db.collection("repartidor");
        const result = await repartidor.updateOne({ id_Repartidor }, { $set: newData });

        if (result.matchedCount === 1) {
            res.send("Repartidor actualizado correctamente");
        } else {
            res.status(404).send("Repartidor no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el repartidor:", error);
        res.status(500).send("Error interno del servidor");
    }

});



export default repartidor;