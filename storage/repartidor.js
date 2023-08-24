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
// "idRepartidor": 1,
// "nombre": "Repartidor1",
// "telefono": "555-123-4567",
// "vehiculo": "Moto",
// "nivel": "plata"
export class repart {
    constructor(data) {
        Object.assign(this, data);
        this.idRepartidor = 0;
        this.Nombre = "nombre_cliente";
        this.telefono = 0;
        this.vehiculo = "veiculo";
        this.nivel = "nivel_cliente";
    }
}
__decorate([
    Expose({ name: 'idRepartidor' }),
    IsDefined({ message: () => { throw { status: 422, message: `El idRepartidor es obligatorio` }; } }),
    __metadata("design:type", Number)
], repart.prototype, "idRepartidor", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `El Nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], repart.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'telefono' }),
    IsDefined({ message: () => { throw { status: 422, message: `El telefono es obligatorio` }; } }),
    __metadata("design:type", Number)
], repart.prototype, "telefono", void 0);
__decorate([
    Expose({ name: 'vehiculo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El vehiculo es obligatorio` }; } }),
    __metadata("design:type", String)
], repart.prototype, "vehiculo", void 0);
__decorate([
    Expose({ name: 'nivel' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nivel es obligatorio` }; } }),
    __metadata("design:type", String)
], repart.prototype, "nivel", void 0);
