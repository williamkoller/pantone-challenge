import { Farm } from '../../../domain/farm/Farm';

export interface FarmRepository {
  save(farm: Farm): Promise<Farm>;
  findById(farmId: string): Promise<Farm | null>;
  update(farm: Farm): Promise<Farm>;
  remove(farmId: string): Promise<void>;
  findAll(): Promise<Farm[]>;
  findByProducerId(producerId: string): Promise<Farm[]>;
}

export const FarmRepository = Symbol('FarmRepository');
