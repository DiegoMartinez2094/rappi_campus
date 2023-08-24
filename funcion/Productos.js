import { con } from "../db/atlas.js";
import { Router } from "express";

const producto = Router();

const db = await con();

producto.get("/disponibles", async(req, res) => {
    try {
        const producto = db.collection("productos");
        const result = await producto.find({ cantidad: { $gte: 1 } }).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

producto.post("/nuevos", async(req, res)=>{
    
    let result;
    try {
        const producto = db.collection("productos");
        result = await producto.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }
})

export default producto;