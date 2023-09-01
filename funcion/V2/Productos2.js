import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";
import { validarToken } from '../../middleware_token/middlewareJWT.js';

const producto = Router();
const db = await con();

producto.get("/producto", limitGrt(), validarToken,async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const id_Producto = req.params.id_Producto ? parseInt(req.params.id_Producto) : null;
    try {
        const db = await con();
        const productos = db.collection("producto");

        if (id_Producto !== null) {
            const result = await productos.findOne({ id_Producto });
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("Producto no encontrado");
            }
        } else {
            const allProductos = await productos.find({}).toArray(); // Obtiene todos los productos
            res.send(allProductos);
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

producto.post("/producto",limitGrt(), validarToken, async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const db = await con();
        const productos = db.collection("producto");
        result = await productos.insertOne(req.body);
        if (result.insertedCount === 0) {
          throw new Error("No se pudo insertar el registro");
        }
        res.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
  });

producto.put("/producto/:id_Producto",limitGrt(), validarToken, async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    const id_Producto = parseInt(req.params.id_Producto);
    const newData = req.body; 
    try {
        const productos = db.collection("producto");
        const result = await productos.updateOne({ id_Producto }, { $set: newData });

        if (result.matchedCount === 1) {
            res.send("Producto actualizado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});

producto.delete("/producto/:id_Producto",limitGrt(), validarToken, async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_Producto = parseInt(req.params.id_Producto);
    try {
        const producto = db.collection("producto");
        const result = await producto.deleteOne({ id_Producto });

        if (result.deletedCount === 1) {
            res.send("Producto eliminado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }

});

export default producto;