import { UseCase } from '../../../../shared/types/UseCase';
import { FarmMapper } from '../../../mappers/FarmMapper';

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface IGetFarmsUseCase extends UseCase<void, Output[]> {}

export const IGetFarmsUseCase = Symbol('IGetFarmsUseCase');
