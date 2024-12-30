import { UseCase } from '@app/shared/types/usecase';
import { FarmMapper } from '@app/application/mappers/farm/farm-mapper';

export type Input = {
  producerId: string;
  name: string;
  state: string;
  arableArea: number;
  vegetationArea: number;
  totalArea: number;
};

export type Output = ReturnType<typeof FarmMapper.toDTO>;

export interface ICreateFarmUseCase extends UseCase<Input, Output> {}

export const ICreateFarmUseCase = Symbol('ICreateFarmUseCase');
