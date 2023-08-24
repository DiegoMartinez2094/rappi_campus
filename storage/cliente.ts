import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
// {
//     idCliente: 1,
//     nombre: "Cliente1",
//     direccion: "Dirección1",
//     telefono: "123-456-7890",
//     nivel: "plata"
// }

export class client {
  @Expose({ name: 'idCliente' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El idCliente es obligatorio`}}})
  idCliente: number;

  @Expose({ name: 'Nombre' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El Nombre es obligatorio`}}})
  Nombre: string;

  @Expose({ name: 'direccion' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El direccion es obligatoria`}}})
  direccion: number;

  @Expose({ name: 'telefono' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono es obligatorio`}}})
  telefono: number;

  @Expose({ name: 'nivel' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El nivel es obligatorio`}}})
  nivel: string;


    constructor(data:Partial<client>) {
      Object.assign(this, data);
      this.idCliente = 0;
      this.Nombre = "nombre_cliente";
      this.direccion=0;
      this.telefono = 0;
      this.nivel="nivel_cliente"
    }
}