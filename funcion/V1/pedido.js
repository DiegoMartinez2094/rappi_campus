import { con } from "../../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from "../../middleware_token/middlewareJWT.js";

const pedido = Router();

pedido.get("/pedido",limitGrt(), validarToken, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const db = await con();
      const pedidos = db.collection("pedido");
      const result = await pedidos.find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      res.status(500).send("Error interno del servidor");
    }
});

export default pedido;