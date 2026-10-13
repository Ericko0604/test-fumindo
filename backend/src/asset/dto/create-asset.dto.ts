import { IsNotEmpty, IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { AssetCategory } from '../asset.entity';

export class CreateAssetDto {
  @IsNotEmpty({ message: 'Nama asset tidak boleh kosong' })
  @IsString({ message: 'Nama asset harus berupa teks' })
  asset_name: string;

  @IsNotEmpty({ message: 'Jumlah stok tidak boleh kosong' })
  @Type(() => Number)
  @IsInt({ message: 'Jumlah stok harus berupa bilangan bulat' })
  @Min(0, { message: 'Jumlah stok minimal 0' })
  stock_quantity: number;

  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  @IsIn([AssetCategory.CONSUMABLE, AssetCategory.NON_CONSUMABLE], {
    message: 'Kategori harus berupa Consumable atau Non-Consumable',
  })
  category: AssetCategory;
}
