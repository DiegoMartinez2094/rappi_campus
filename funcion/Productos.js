import { con } from "../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../limit/config.js";

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

producto.get("/:id_producto",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_producto = parseInt(req.params.id_producto); // Parsea el parámetro como un número entero
    try {
        const db = await con();
        const productos = db.collection("producto");
        const result = await productos.findOne({ id_producto }); 
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("producto no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});

producto.post("/",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const producto = db.collection("producto");
        result = await producto.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }

});

producto.put("/:id_producto",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    const id_producto = parseInt(req.params.id_producto);
    const newData = req.body; 
    try {
        const productos = db.collection("producto");
        const result = await productos.updateOne({ id_producto }, { $set: newData });

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

producto.delete("/:id_producto",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_producto = parseInt(req.params.id_producto);
    try {
        const producto = db.collection("producto");
        const result = await producto.deleteOne({ id_producto });

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