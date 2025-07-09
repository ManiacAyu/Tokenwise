// src/models/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  walletAddress: string;

  @Column('decimal', { precision: 20, scale: 8 })
  amount: number;

  @Column('text')
  type: 'buy' | 'sell';

  @Column('text')
  protocol: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  timestamp: Date;

  @Column('text', { unique: true })
  @Index()
  signature: string; // <-- Add this
}
