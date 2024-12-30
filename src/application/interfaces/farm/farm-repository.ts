import { Farm } from '@app/domain/farm/farm';

export interface FarmRepository {
  save(farm: Farm): Promise<Farm>;
  findById(farmId: string): Promise<Farm | null>;
  update(farm: Farm): Promise<Farm>;
  remove(farmId: string): Promise<void>;
  findAll(): Promise<Farm[]>;
  findByProducerId(producerId: string): Promise<Farm[]>;
  findByName(name: string): Promise<Farm | null>;
}

export const FarmRepository = Symbol('FarmRepository');
