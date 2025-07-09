var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// src/models/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
let Transaction = class Transaction {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Transaction.prototype, "walletAddress", void 0);
__decorate([
    Column('decimal', { precision: 20, scale: 8 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Transaction.prototype, "protocol", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Transaction.prototype, "timestamp", void 0);
Transaction = __decorate([
    Entity()
], Transaction);
export { Transaction };
//# sourceMappingURL=Transaction.js.map