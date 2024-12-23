import { ProducerDocumentType } from '../../../../domain/producer/Producer';
import { UseCase } from '../../../../shared/types/UseCase';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

export type Input = {
  name: string;
  document: string;
  documentType: ProducerDocumentType;
};

export type Output = ReturnType<typeof ProducerMapper.toDTO>;

export interface ICreateProducerUseCase extends UseCase<Input, Output> {}

export const ICreateProducerUseCase = Symbol('ICreateProducerUseCase');
