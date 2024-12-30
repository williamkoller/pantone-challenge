import { UseCase } from '@app/shared/types/UseCase';
import { FarmMapper } from '@app/application/mappers/farm/FarmMapper';

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
