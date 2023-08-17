import { con } from "../db/atlas.js";
import {Router} from "express";

const appCliente = Router();

let db = await con();
let clientes = db.collection("clientes");

appCliente.get("/", async(req, res) => { 
  
    let db = await con();
    let result = await clientes.find({}).toArray();
    res.send(result); });

export default appCliente;