import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Output = ReturnType<typeof UserMapper.toDTO>[];

export interface IGetUsersUseCase extends UseCase<void, Output> {}

export const IGetUsersUseCase = Symbol('IGetUsersUseCase');
