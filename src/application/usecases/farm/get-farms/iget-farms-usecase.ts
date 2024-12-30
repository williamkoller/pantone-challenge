import { UseCase } from '@app/shared/types/usecase';
import { FarmMapper } from '@app/application/mappers/farm/farm-mapper';

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface IGetFarmsUseCase extends UseCase<void, Output[]> {}

export const IGetFarmsUseCase = Symbol('IGetFarmsUseCase');
