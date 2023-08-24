var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
// {
//     idCliente: 1,
//     nombre: "Cliente1",
//     direccion: "Dirección1",
//     telefono: "123-456-7890",
//     nivel: "plata"
// }
export class client {
    constructor(data) {
        Object.assign(this, data);
        this.idCliente = 0;
        this.Nombre = "nombre_cliente";
        this.direccion = 0;
        this.telefono = 0;
        this.nivel = "nivel_cliente";
    }
}
__decorate([
    Expose({ name: 'idCliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El idCliente es obligatorio` }; } }),
    __metadata("design:type", Number)
], client.prototype, "idCliente", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `El Nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], client.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    IsDefined({ message: () => { throw { status: 422, message: `El direccion es obligatoria` }; } }),
    __metadata("design:type", Number)
], client.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'telefono' }),
    IsDefined({ message: () => { throw { status: 422, message: `El telefono es obligatorio` }; } }),
    __metadata("design:type", Number)
], client.prototype, "telefono", void 0);
__decorate([
    Expose({ name: 'nivel' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nivel es obligatorio` }; } }),
    __metadata("design:type", String)
], client.prototype, "nivel", void 0);
