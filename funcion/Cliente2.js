import { con } from "../db/atlas.js";
import { Router } from "express";

const cliente2 = Router();

cliente2.get("/todos", async (req, res) => {
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


cliente2.get("/:idCliente", async (req, res) => {
    const idCliente = parseInt(req.params.idCliente); // Parsea el parámetro como un número entero

    try {
        const db = await con();
        const clientes = db.collection("clientes");
        const result = await clientes.findOne({ idCliente }); // Encuentra un cliente por el idCliente
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Cliente no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente2.delete("/:idCliente", async (req, res) => {
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

cliente2.put("/:idCliente", async (req, res) => {
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


export default cliente2;
