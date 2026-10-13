import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AssetCategory {
  CONSUMABLE = 'Consumable',
  NON_CONSUMABLE = 'Non-Consumable',
}

@Entity('asset')
export class Asset {
  @PrimaryGeneratedColumn({ name: 'asset_id' })
  asset_id: number;

  @Column({ name: 'asset_name', type: 'varchar', length: 255 })
  asset_name: string;

  @Column({ name: 'stock_quantity', type: 'int', default: 0 })
  stock_quantity: number;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 50,
  })
  category: AssetCategory;
}
