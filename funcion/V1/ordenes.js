import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";

const ordenes1 = Router();

ordenes1.get("/orden",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const db = await con();
      const ordenes = db.collection("orden");
      const result = await ordenes.find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error("Error al obtener los ordenes:", error);
      res.status(500).send("Error interno del servidor");
    }
});

export default ordenes1;