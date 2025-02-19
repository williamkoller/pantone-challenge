import { UseCase } from '../../../../shared/types/usecase';

export type Input = {
  userId: string;
};

export interface IDeleteUserUseCase extends UseCase<Input, void> {}

export const IDeleteUserUseCase = Symbol('IDeleteUserUseCase');
