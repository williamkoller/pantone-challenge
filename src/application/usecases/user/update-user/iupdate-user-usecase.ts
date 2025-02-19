import { UserRoleEnum } from '../../../../domain/user/user';
import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Input = {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
};

export type Output = ReturnType<typeof UserMapper.toDTO>;

export interface IUpdateUserUseCase extends UseCase<Input, Output> {}

export const IUpdateUserUseCase = Symbol('IUpdateUserUseCase');
