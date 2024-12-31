import { UseCase } from '@app/shared/types/usecase';
import { FarmCropMapper } from '../../../mappers/farm-crop/farm-crop-mapper';

export type OutPut = ReturnType<typeof FarmCropMapper.toDTO>;

export interface IGetFarmCropsUseCase extends UseCase<void, OutPut[]> {}

export const IGetFarmCropsUseCase = Symbol('IGetFarmCropsUseCase');
