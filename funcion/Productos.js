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


export default producto;