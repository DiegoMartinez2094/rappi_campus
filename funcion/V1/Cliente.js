import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";


const cliente = Router();

cliente.get("/",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const clientes = db.collection("cliente");
        const result = await clientes.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error interno del servidor");
    }
});


export default cliente;
