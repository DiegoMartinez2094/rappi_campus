import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";

const producto = Router();
const db = await con();

producto.get("/",limitGrt(), async(req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const producto = db.collection("producto");
        const result = await producto.find({ cantidad: { $gte: 1 } }).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default producto;