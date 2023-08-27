import { con } from "../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";

const producto = Router();
const db = await con();

producto.get("/", async(req, res) => {
    try {
        const producto = db.collection("productos");
        const result = await producto.find({ cantidad: { $gte: 1 } }).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

producto.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id); // Parsea el parámetro como un número entero
    try {
        const db = await con();
        const productos = db.collection("productos");
        const result = await productos.findOne({ id }); 
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

producto.post("/", async(req, res)=>{
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    let result;
    try {
        const producto = db.collection("productos");
        result = await producto.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }

});

producto.put("/:id", async(req, res)=>{
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    const id = parseInt(req.params.id);
    const newData = req.body; 
    try {
        const productos = db.collection("productos");
        const result = await productos.updateOne({ id }, { $set: newData });

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

producto.delete("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    try {
        const producto = db.collection("productos");
        const result = await producto.deleteOne({ id });

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