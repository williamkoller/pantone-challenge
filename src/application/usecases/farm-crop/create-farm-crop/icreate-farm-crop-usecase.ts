import { UseCase } from '@app/shared/types/usecase';
import { FarmCropMapper } from '@app/application/mappers/farm-crop/farm-crop-mapper';

export interface Input {
  farmId: string;
  cropId: string;
  seasonYear: number;
  plantedArea: number;
}

export type Output = ReturnType<typeof FarmCropMapper.toDTO>;

export interface ICreateFarmCropUseCase extends UseCase<Input, Output> {}

export const ICreateFarmCropUseCase = Symbol('ICreateFarmCropUseCase');
