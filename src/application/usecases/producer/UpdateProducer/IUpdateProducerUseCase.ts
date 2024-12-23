import { ProducerDocumentType } from '../../../../domain/Producer';
import { UseCase } from '../../../../shared/types/UseCase';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

export type Input = {
  producerId: string;
  name?: string;
  document?: string;
  documentType?: ProducerDocumentType;
};

export type Output = ReturnType<typeof ProducerMapper.toDTO>;

export interface IUpdateProducerUseCase extends UseCase<Input, Output> {}

export const IUpdateProducerUseCase = Symbol('IUpdateProducerUseCase');
