import { Producer } from '../../domain/Producer';

export interface ProducerRepositoryInterface {
  save(producer: Producer): Promise<Producer>;
  findById(producerId: string): Promise<Producer | null>;
  update(producer: Producer): Promise<Producer>;
  remove(producerId: string): Promise<void>;
  findAll(): Promise<Producer[]>;
  findByDocument(document: string): Promise<Producer | null>;
}

export const ProducerRepositoryInterface = Symbol(
  'ProducerRepositoryInterface',
);
