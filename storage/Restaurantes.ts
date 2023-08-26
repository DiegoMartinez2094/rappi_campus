import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class restaurante{
    @Expose ({ name : 'nombre' })
    @IsDefined ({ message : () => { throw { status : 422, message : `El nombre es obligatorio` }}})
    NOM : string;

    @Expose ({ name : 'direccion' })
    @IsDefined ({ message : () => { throw { status : 422, message : `La dirección es obligatoria` }}})
    DIR : string;

    @Expose ({ name : 'calificacion' })
    @IsDefined ({ message : () => { throw { status : 422, message : `La calificación es obligatoria` }}})
    CAL : number;

    constructor(data:Partial<restaurante>) {
      Object.assign(this, data);
      this.NOM = "nombre_del_restaurante";
      this.DIR = "direccion_restaurante";
      this.CAL= 0;
    }
}