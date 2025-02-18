import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Input = {
  userId: string;
};

export type Output = ReturnType<typeof UserMapper.toDTO>;

export interface IGetUserUseCase extends UseCase<Input, Output> {}

export const IGetUserUseCase = Symbol('IGetUserUseCase');
