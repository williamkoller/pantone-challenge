import { UseCase } from '../../../../shared/types/UseCase';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

export type Output = ReturnType<typeof ProducerMapper.toDTO>;

export interface IGetProducersUseCase extends UseCase<void, Output[]> {}

export const IGetProducersUseCase = Symbol('IGetProducersUseCase');
