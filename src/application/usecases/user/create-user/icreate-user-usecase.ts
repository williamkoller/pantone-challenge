import { UserRoleEnum } from '../../../../domain/user/user';
import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Input = {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
};

export type Output = ReturnType<typeof UserMapper.toDTO>;

export interface ICreateUserUseCase extends UseCase<Input, Promise<Output>> {}

export const ICreateUserUseCase = Symbol('ICreateUserUseCase');
