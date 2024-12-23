import { UseCase } from '../../../../shared/types/UseCase';
import { FarmMapper } from '../../../mappers/FarmMapper';

export type Input = {
  producerId: string;
  name: string;
  state: string;
  arableArea: number;
  vegetationArea: number;
};

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface ICreateFarmUseCase extends UseCase<Input, Output> {}

export const ICreateFarmUseCase = Symbol('ICreateFarmUseCase');
