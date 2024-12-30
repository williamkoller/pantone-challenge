import { UseCase } from '@app/shared/types/usecase';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';

export type Output = ReturnType<typeof ProducerMapper.toDTO>;

export interface IGetProducersUseCase extends UseCase<void, Output[]> {}

export const IGetProducersUseCase = Symbol('IGetProducersUseCase');
