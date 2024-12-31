import { UseCase } from '../../../shared/types/usecase';

export interface IDashboardUseCase extends UseCase<void, any> {}

export const IDashboardUseCase = Symbol('IDashboardUseCase');
