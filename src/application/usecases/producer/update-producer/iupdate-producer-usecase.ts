import { ProducerDocumentType } from '@app/domain/producer/producer';
import { UseCase } from '@app/shared/types/UseCase';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';

export type Input = {
  producerId: string;
  name?: string;
  document?: string;
  documentType?: ProducerDocumentType;
};

export type Output = ReturnType<typeof ProducerMapper.toDTO>;

export interface IUpdateProducerUseCase extends UseCase<Input, Output> {}

export const IUpdateProducerUseCase = Symbol('IUpdateProducerUseCase');
