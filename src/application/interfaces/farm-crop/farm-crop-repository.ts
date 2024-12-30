import { FarmCrop } from '@app/domain/farm-crop/farm-crop';

export interface FarmCropRepository {
  save(farmCrop: FarmCrop): Promise<FarmCrop>;
  findByFarmIdAndSeasonYear(
    farmId: string,
    seasonYear: number,
  ): Promise<FarmCrop | null>;
  findByFarmId(farmId: string): Promise<FarmCrop[]>;
  findByCropId(cropId: string): Promise<FarmCrop[]>;
}

export const FarmCropRepository = Symbol('FarmCropRepository');
