import { con } from "../db/atlas.js";
import { Router } from "express";

const repartidor = Router();

const db = await con();

repartidor.get("/todos", async(req, res)=>{

    try {
        const repartidor = db.collection("repartidores");
        const result = await repartidor.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los repartidores:", error);
        res.status(500).send("Error interno del servidor");
    }

});

repartidor.post("/agregar", async(req, res)=>{

    let result;
    try {
        const repartidor = db.collection("repartidores");
        result = await repartidor.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }

});

repartidor.put("/:idRepartidor", async(req, res)=>{

    const idRepartidor = parseInt(req.params.idRepartidor);
    const newData = req.body; 

    try {
        const db = await con();
        const repartidor = db.collection("repartidores");
        const result = await repartidor.updateOne({ idRepartidor }, { $set: newData });

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