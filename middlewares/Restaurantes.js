import 'reflect-metadata';
import { Router } from "express";
import {validate} from 'class-validator';
import {plainToClass, classToPlain} from 'class-transformer';
import { restaurante } from '../storage/Restaurantes.js'

const DTO = Router();

DTO.use( async(req,res,next) => {
    try {
        let data = plainToClass(restaurante, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err)
    }
});

export default DTO;