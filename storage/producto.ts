import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';

// id_producto: 1,
// nombre_producto: "Producto1",
// descripcion_producto: "Descripción del producto 1",
// cantidad_producto: 10,
// precio_producto: 20

export class product {
  @Expose({ name: 'id_producto' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El id_producto es obligatorio`}}})
  id_producto: number;

  @Expose({ name: 'nombre_producto' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre_producto es obligatorio`}}})
  nombre_producto: string;

  @Expose({ name: 'descripcion_producto' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El descripcion_producto es obligatorio`}}})
  descripcion_producto: string;

  @Expose({ name: 'cantidad_producto' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `La cantidad_producto es obligatorio`}}})
  cantidad_producto: number;

  
  @Expose({ name: 'precio_producto' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `La precio_producto es obligatorio`}}})
  precio_producto: number;




    constructor(data:Partial<product>) {
      Object.assign(this, data);
      this.id_producto = 0;
      this.nombre_producto = "nombre_producto";
      this.descripcion_producto="descripcion"
      this.cantidad_producto=0
      this.precio_producto=0
    }
}