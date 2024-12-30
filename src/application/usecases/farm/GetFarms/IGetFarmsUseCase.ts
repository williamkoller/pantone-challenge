import { UseCase } from '@app/shared/types/UseCase';
import { FarmMapper } from '@app/application/mappers/farm/FarmMapper';

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface IGetFarmsUseCase extends UseCase<void, Output[]> {}

export const IGetFarmsUseCase = Symbol('IGetFarmsUseCase');
