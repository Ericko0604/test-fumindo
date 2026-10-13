import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetRepository.find({
      order: { asset_id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { asset_id: id },
    });
    if (!asset) {
      throw new NotFoundException(`Asset dengan ID ${id} tidak ditemukan`);
    }
    return asset;
  }

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const newAsset = this.assetRepository.create(createAssetDto);
    return this.assetRepository.save(newAsset);
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.findOne(id);
    Object.assign(asset, updateAssetDto);
    return this.assetRepository.save(asset);
  }

  async remove(id: number): Promise<{ message: string }> {
    const asset = await this.findOne(id);
    await this.assetRepository.remove(asset);
    return { message: `Asset dengan ID ${id} berhasil dihapus` };
  }
}
