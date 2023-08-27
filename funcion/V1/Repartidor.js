import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";

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

export default repartidor;