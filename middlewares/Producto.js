import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';
import { product } from "../storage/producto.js";
import { Router } from "express";

const appDTOData = Router();


appDTOData.use( async(req,res,next) => {
    try {
        let data = plainToClass(product, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err)
    }
});

export {
    appDTOData
};