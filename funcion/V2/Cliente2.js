import { con } from "../../db/atlas.js";
import { Router } from "express";
import { validationResult } from "express-validator";
import { limitGrt } from "../../limit/config.js";

const cliente2 = Router();

cliente2.get("/:id_Cliente?", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_Cliente = req.params.id_Cliente ? parseInt(req.params.id_Cliente) : null; // Parsea el parámetro como un número entero si está presente
    try {
        const db = await con();
        const clientes = db.collection("cliente");

        if (id_Cliente !== null) {
            const result = await clientes.findOne({ id_Cliente }); // Encuentra un cliente por el id_Cliente
            if (result) {
                res.send(result);
            } else {
                res.status(404).send("Cliente no encontrado");
            }
        } else {
            const allClientes = await clientes.find({}).toArray(); // Obtiene todos los clientes
            res.send(allClientes);
        }
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente2.get("/nombre/:nombre_Cliente", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const nombre_Cliente = req.params.nombre_Cliente;
    try {
        const db = await con();
        const clientes = db.collection("cliente");
        const matchingClientes = await clientes.find({ nombre_Cliente }).toArray();
        if (matchingClientes.length > 0) {
            res.send(matchingClientes);
        } else {
            res.status(404).send("Clientes no encontrados con el nombre especificado");
        }
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente2.get("/nivel/:nivel_Cliente", limitGrt(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const nivel_Cliente = req.params.nivel_Cliente;
    try {
        const db = await con();
        const clientes = db.collection("cliente");
        const matchingClientes = await clientes.find({ nivel_Cliente }).toArray();
        if (matchingClientes.length > 0) {
            res.send(matchingClientes);
        } else {
            res.status(404).send("Clientes no encontrados con el nivel especificado");
        }
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

cliente2.post("/",limitGrt(), async(req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
let resul;
try { 
    const db = await con();
    const clientes = db.collection("cliente");
    resul = await clientes.insertOne(req.body);
    res.status(201).send(resul);
} catch (error) {
    console.log(error);
    res.send();
}
});    

cliente2.delete("/:id_Cliente",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    const id_Cliente = parseInt(req.params.id_Cliente);
    try {
        const db = await con();
        const clientes = db.collection("cliente");
        const result = await clientes.deleteOne({ id_Cliente });
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

cliente2.put("/:id_Cliente",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
      const {errors} = validationResult(req)
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }
    const id_Cliente = parseInt(req.params.id_Cliente);
    const newData = req.body; // Los nuevos datos para actualizar el cliente
    try {
        const db = await con();
        const clientes = db.collection("cliente");
        const result = await clientes.updateOne({ id_Cliente }, { $set: newData });
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