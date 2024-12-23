import { FarmMapper } from './FarmMapper';
import { Farm } from '../../domain/Farm';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { FarmAttributes } from '../../infrastructure/database/models/FarmModel';

describe('FarmMapper', () => {
  const uniqueId = new UniqueEntityId('123');
  const farmProps = {
    producerId: 'producer-id',
    name: 'Test Farm',
    arableArea: 100,
    state: 'Test State',
    totalArea: 500,
    vegetationArea: 200,
  };

  const farm = Farm.create(farmProps, uniqueId);

  it('should map to persistence correctly', () => {
    const persistenceData = FarmMapper.toPersistence(farm);

    expect(persistenceData).toEqual({
      id: uniqueId.toString(),
      producerId: farmProps.producerId,
      name: farmProps.name,
      arableArea: farmProps.arableArea,
      state: farmProps.state,
      totalArea: farmProps.totalArea,
      vegetationArea: farmProps.vegetationArea,
    });
  });

  it('should map to domain correctly from persistence data', () => {
    const rawData: FarmAttributes = {
      id: '123',
      producerId: farmProps.producerId,
      name: farmProps.name,
      arableArea: farmProps.arableArea,
      state: farmProps.state,
      totalArea: farmProps.totalArea,
      vegetationArea: farmProps.vegetationArea,
    };

    const mappedFarm = FarmMapper.toDomain(rawData);

    expect(mappedFarm.id.toString()).toBe('123');
    expect(mappedFarm.producerId.toString()).toBe(farmProps.producerId);
    expect(mappedFarm.name).toBe(farmProps.name);
    expect(mappedFarm.arableArea).toBe(farmProps.arableArea);
    expect(mappedFarm.state).toBe(farmProps.state);
    expect(mappedFarm.totalArea).toBe(farmProps.totalArea);
    expect(mappedFarm.vegetationArea).toBe(farmProps.vegetationArea);
  });

  it('should map to DTO correctly', () => {
    const dto = FarmMapper.toDTO(farm);

    expect(dto).toEqual({
      id: uniqueId.toString(),
      producerId: farmProps.producerId,
      name: farmProps.name,
      arableArea: farmProps.arableArea,
      state: farmProps.state,
      totalArea: farmProps.totalArea,
      vegetationArea: farmProps.vegetationArea,
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    });
  });
});
