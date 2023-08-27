import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";


const repartidor = Router();
const db = await con();

repartidor.get("/:id_Repartidor?", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id_Repartidor = req.params.id_Repartidor ? parseInt(req.params.id_Repartidor) : null;
    try {
        const db = await con();
        const repartidores = db.collection("repartidor");
        if (id_Repartidor !== null) {
            const result = await repartidores.findOne({ id_Repartidor });
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("repartidor no encontrado");
            }
        } else {
            const allrepartidores = await repartidores.find({}).toArray(); // Obtiene todos los repartidores
            res.send(allrepartidores);
        }
    } catch (error) {
        console.error("Error al obtener los repartidores:", error);
        res.status(500).send("Error interno del servidor");
    }
});

repartidor.get("/nivel/:nivel_repartidor", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const nivel_repartidor = req.params.nivel_repartidor;
    try {
        const db = await con();
        const repartidores = db.collection("repartidor");
        const matchingRepartidores = await repartidores.find({ nivel_repartidor }).toArray();
        if (matchingRepartidores.length > 0) {
            res.send(matchingRepartidores);
        } else {
            res.status(404).send("repartidores no encontrados con el nivel especificado");
        }
    } catch (error) {
        console.error("Error al obtener los repartidores:", error);
        res.status(500).send("Error interno del servidor");
    }
});

repartidor.get("/vehiculo/:vehiculo", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const vehiculo = req.params.vehiculo;
    try {
        const db = await con();
        const repartidores = db.collection("repartidor");
        const matchingRepartidores = await repartidores.find({ vehiculo }).toArray();
        if (matchingRepartidores.length > 0) {
            res.send(matchingRepartidores);
        } else {
            res.status(404).send("repartidores no encontrados con el vehiculo especificado");
        }
    } catch (error) {
        console.error("Error al obtener los repartidores:", error);
        res.status(500).send("Error interno del servidor");
    }
});

repartidor.get("/nombre/:nombre_Repartidor", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const nombre_Repartidor = req.params.nombre_Repartidor;
    try {
        const db = await con();
        const repartidores = db.collection("repartidor");
        const matchingRepartidores = await repartidores.find({ nombre_Repartidor }).toArray();
        if (matchingRepartidores.length > 0) {
            res.send(matchingRepartidores);
        } else {
            res.status(404).send("repartidores no encontrados con el nombre Repartidor especificado");
        }
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

repartidor.delete("/:id_Repartidor", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id_Repartidor = parseInt(req.params.id_Repartidor);
    try {
        const db = await con();
        const repartidor = db.collection("repartidor");

        const result = await repartidor.deleteOne({ idRepartidor: id_Repartidor });

        if (result.deletedCount === 1) {
            res.send("Repartidor eliminado exitosamente");
        } else {
            res.status(404).send("Repartidor no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el repartidor:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default repartidor;