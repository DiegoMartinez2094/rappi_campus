import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";


const restaurante1 = Router();

restaurante1.get("/restaurante",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const restaurantes = db.collection("restaurante");
        const result = await restaurantes.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default restaurante1;