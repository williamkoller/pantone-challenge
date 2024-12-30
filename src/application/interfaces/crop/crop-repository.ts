import { Crop } from '@app/domain/crop/crop';

export interface CropRepository {
  save(crop: Crop): Promise<Crop>;
  findById(cropId: string): Promise<Crop | null>;
  findByFarmIdAndYearAndCropType(
    farmId: string,
    year: number,
    cropType: string,
  ): Promise<Crop | null>;
  findAll(): Promise<Crop[]>;
}

export const CropRepository = Symbol('CropRepository');
