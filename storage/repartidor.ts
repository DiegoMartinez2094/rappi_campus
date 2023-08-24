import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';

// "idRepartidor": 1,
// "nombre": "Repartidor1",
// "telefono": "555-123-4567",
// "vehiculo": "Moto",
// "nivel": "plata"

export class repart {
  @Expose({ name: 'idRepartidor' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El idRepartidor es obligatorio`}}})
  idRepartidor: number;

  @Expose({ name: 'Nombre' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El Nombre es obligatorio`}}})
  Nombre: string;

  @Expose({ name: 'telefono' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El telefono es obligatorio`}}})
  telefono: number;

  @Expose({ name: 'vehiculo' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El vehiculo es obligatorio`}}})
  vehiculo: string;

  @Expose({ name: 'nivel' })
  @IsDefined({message: ()=>{ throw {status: 422, message: `El nivel es obligatorio`}}})
  nivel: string;


    constructor(data:Partial<repart>) {
      Object.assign(this, data);
      this.idRepartidor = 0;
      this.Nombre = "nombre_cliente";
      this.telefono = 0;
      this.vehiculo="veiculo"
      this.nivel="nivel_cliente"
    }
}