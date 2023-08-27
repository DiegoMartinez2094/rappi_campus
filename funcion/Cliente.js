import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";


const cliente = Router();

cliente.get("/",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
        const db = await con();
        const clientes = db.collection("clientes");
        const result = await clientes.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente.post("/",limitGrt(),  async(req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    let resul;
    try {
        resul = await cliente.insertOne(req.body);
        res.status(201).send(resul);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }
});



cliente.delete("/:idCliente",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const idCliente = parseInt(req.params.idCliente);

    try {
        const db = await con();
        const clientes = db.collection("clientes");
        const result = await clientes.deleteOne({ idCliente });

        if (result.deletedCount === 1) {
            res.send("Cliente eliminado correctamente");
        } else {
            res.status(404).send("Cliente no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente.put("/:idCliente",limitGrt(),  async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const idCliente = parseInt(req.params.idCliente);
    const newData = req.body; // Los nuevos datos para actualizar el cliente

    try {
        const db = await con();
        const clientes = db.collection("clientes");
        const result = await clientes.updateOne({ idCliente }, { $set: newData });

        if (result.matchedCount === 1) {
            res.send("Cliente actualizado correctamente");
        } else {
            res.status(404).send("Cliente no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).send("Error interno del servidor");
    }
});

export default cliente;
