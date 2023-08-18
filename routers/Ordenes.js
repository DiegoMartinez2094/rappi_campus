import { con } from "../db/atlas.js";
import { Router } from "express";

const appOrdenes = Router();

let db = await con();
let ordenes = db.collection("ordenes");


/**guardar ordenes */
appOrdenes.post("/", async (req, res) => {
    let db = await con();
    let orden = req.body;
    let result = await ordenes.insertOne(orden);
    res.send(result);
});

//**obtener todas las ordenes */
appOrdenes.get("/", async (req, res) => {
    let db = await con();
    let result = await ordenes.find({}).toArray();
    res.send(result);
});

//**obtener orden por idOrden */
appOrdenes.get("/idOrden/:idOrden", async (req, res) => {
    const idOrden =  parseInt(req.params.idOrden);
    let db = await con();
    let result = await ordenes.findOne({ idOrden: idOrden });
    if (result) {
        res.send(result);
    } else {
        res.status(404).send("Orden no encontrada");
    }
});

//**Ruta para modificar una orden */
appOrdenes.put("/idOrden/:idOrden", async (req, res) => {
    const idOrden =  parseInt(req.params.idOrden);
    const newData = req.body;

    let db = await con();
    let result = await ordenes.updateOne({ idOrden: idOrden }, { $set: newData });

    if (result.modifiedCount > 0) {
        res.send("Orden actualizada exitosamente");
    } else {
        res.status(404).send("Orden no encontrada");
    }
});

//**ruta para eliminar una orden por su idOrden */
appOrdenes.delete("/:idOrden", async (req, res) => {
    const idOrden =  parseInt(req.params.idOrden);

    let db = await con();
    let result = await ordenes.deleteOne({ idOrden: idOrden });

    if (result.deletedCount > 0) {
        res.send("Orden eliminada exitosamente");
    } else {
        res.status(404).send("Orden no encontrada");
    }
});

//**Filtrar ordenes por su estado */
appOrdenes.get("/estado/:estado", async (req, res) => {
    const estado = req.params.estado;
    let db = await con();
    let result = await ordenes.find({ estado: estado }).toArray();
    res.send(result);
});

export default appOrdenes;