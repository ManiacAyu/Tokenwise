import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address: string;

  @Column('decimal', { precision: 20, scale: 8 })
  tokenAmount: number;
}
