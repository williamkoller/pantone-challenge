import { Producer } from '../../domain/Producer';

export interface ProducerRepositoryInterface {
  save(producer: Producer): Promise<Producer>;
  findById(producerId: string): Promise<Producer | null>;
  update(producer: Producer): Promise<void>;
  remove(producerId: string): Promise<void>;
}

export const ProducerRepositoryInterface = Symbol(
  'ProducerRepositoryInterface',
);
