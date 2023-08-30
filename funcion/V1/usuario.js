import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from '../../middleware_token/middlewareJWT.js';


const usuario = Router();

usuario.get("/usuario",limitGrt(),validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const usuarios = db.collection("usuario");
        const result = await usuarios.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
});


export default usuario;
