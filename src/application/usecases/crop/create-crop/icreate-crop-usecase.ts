import { UseCase } from '@app/shared/types/usecase';
import { CropMapper } from '@app/application/mappers/crop/crop-mapper';

export type Input = {
  farmId: string;
  year: number;
  cropType: string;
};

export type Output = ReturnType<typeof CropMapper.toDTO>;

export interface ICreateCropUseCase extends UseCase<Input, Output> {}

export const ICreateCropUseCase = Symbol('ICreateCropUseCase');
