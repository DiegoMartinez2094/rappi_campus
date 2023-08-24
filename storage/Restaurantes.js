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
export class restaurante {
    constructor(data) {
        Object.assign(this, data);
        this.NOM = "nombre_del_restaurante";
        this.DIR = "direccion_restaurante";
        this.CAL = 0;
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], restaurante.prototype, "NOM", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    IsDefined({ message: () => { throw { status: 422, message: `La dirección es obligatoria` }; } }),
    __metadata("design:type", String)
], restaurante.prototype, "DIR", void 0);
__decorate([
    Expose({ name: 'calificacion' }),
    IsDefined({ message: () => { throw { status: 422, message: `La calificación es obligatoria` }; } }),
    __metadata("design:type", Number)
], restaurante.prototype, "CAL", void 0);
