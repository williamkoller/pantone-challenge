import { UseCase } from '@app/shared/types/usecase';
import { CropMapper } from '@app/application/mappers/crop/crop-mapper';

export type Output = ReturnType<typeof CropMapper.toDTO>;

export interface IGetCropsUseCase extends UseCase<void, Output[]> {}

export const IGetCropsUseCase = Symbol('IGetCropsUseCase');
