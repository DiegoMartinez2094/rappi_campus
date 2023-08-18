import dotenv from "dotenv";
import express from "express";
import appCliente from "./routers/Cliente.js"
import appOrdenes from "./routers/Ordenes.js";
dotenv.config();
let app=express();

app.use(express.json());

let config = JSON.parse(process.env.My_server);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

app.use("/clientes",appCliente);
app.use("/ordenes",appOrdenes);