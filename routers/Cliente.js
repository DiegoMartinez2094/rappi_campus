import { con } from "../db/atlas.js";
import { Router } from "express";

const appCliente = Router();

let db = await con();
let clientes = db.collection("clientes");

appCliente.get("/", async (req, res) => {
    let db = await con();
    let result = await clientes.find({}).toArray();
    res.send(result);
});
/**guardar cliente */
appCliente.post("/", async (req, res) => {
    let db = await con();
    let cliente = req.body;
    let result = await clientes.insertOne(cliente);
    res.send(result);
});

//**obtener cliente por nivel */
appCliente.get("/nivel/:nivel", async (req, res) => {
    const nivel = req.params.nivel;
    let db = await con();
    let result = await clientes.findOne({ nivel: nivel });
    if (result) {
        res.send(result);
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});
//**obtener cliente por idCliente */
appCliente.get("/idCliente/:idCliente", async (req, res) => {
    const idCliente = parseInt(req.params.idCliente);
    let db = await con();
    let result = await clientes.findOne({ idCliente: idCliente });
    if (result) {
        res.send(result);
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});
//**modificar cliente por idCliente */
appCliente.put("/idCliente/:idCliente", async (req, res) => {
    const idCliente = parseInt(req.params.idCliente);
    const newData = req.body; 

    let db = await con();
    let result = await clientes.updateOne({ idCliente: idCliente }, { $set: newData });

    if (result.modifiedCount > 0) {
        res.send("Cliente actualizado exitosamente");
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});
//** */
appCliente.delete("/idCliente/:idCliente", async (req, res) => {
    const idCliente = parseInt(req.params.idCliente);
    
    let db = await con();
    let result = await clientes.deleteOne({ idCliente: idCliente });

    if (result.deletedCount > 0) {
        res.send("Cliente eliminado exitosamente");
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});

export default appCliente;