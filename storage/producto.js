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
// id_producto: 1,
// nombre_producto: "Producto1",
// descripcion_producto: "Descripción del producto 1",
// cantidad_producto: 10,
// precio_producto: 20
export class product {
    constructor(data) {
        Object.assign(this, data);
        this.id_producto = 0;
        this.nombre_producto = "nombre_producto";
        this.descripcion_producto = "descripcion";
        this.cantidad_producto = 0;
        this.precio_producto = 0;
    }
}
__decorate([
    Expose({ name: 'id_producto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id_producto es obligatorio` }; } }),
    __metadata("design:type", Number)
], product.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: 'nombre_producto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El nombre_producto es obligatorio` }; } }),
    __metadata("design:type", String)
], product.prototype, "nombre_producto", void 0);
__decorate([
    Expose({ name: 'descripcion_producto' }),
    IsDefined({ message: () => { throw { status: 422, message: `El descripcion_producto es obligatorio` }; } }),
    __metadata("design:type", String)
], product.prototype, "descripcion_producto", void 0);
__decorate([
    Expose({ name: 'cantidad_producto' }),
    IsDefined({ message: () => { throw { status: 422, message: `La cantidad_producto es obligatorio` }; } }),
    __metadata("design:type", Number)
], product.prototype, "cantidad_producto", void 0);
__decorate([
    Expose({ name: 'precio_producto' }),
    IsDefined({ message: () => { throw { status: 422, message: `La precio_producto es obligatorio` }; } }),
    __metadata("design:type", Number)
], product.prototype, "precio_producto", void 0);
