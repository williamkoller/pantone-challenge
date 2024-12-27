import { UseCase } from '../../../../shared/types/UseCase';
import { FarmMapper } from '../../../mappers/FarmMapper';

export type Input = {
  farmId: string;
  producerId: string;
  name: string;
  state: string;
  arableArea: number;
  vegetationArea: number;
  totalArea: number;
};

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface IUpdateFarmUseCase extends UseCase<Input, Output> {}

export const IUpdateFarmUseCase = Symbol('IUpdateFarmUseCase');
