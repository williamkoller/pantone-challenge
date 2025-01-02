import { DomainValidationException } from '../../shared/domain/domain-validation-exception';
import { FarmAreaValidationService } from '../services/farm/farm-area-validation-service';
import { Farm, FarmProps } from './farm';

jest.mock('../services/farm/farm-area-validation-service');

describe('Farm', () => {
  it('should create a valid Farm', () => {
    const validProps: FarmProps = {
      producerId: 'producer-123',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      landUse: 'Some land use',
    };

    const farm = Farm.create(validProps);

    expect(farm.producerId).toBe(validProps.producerId);
    expect(farm.name).toBe(validProps.name);
    expect(farm.state).toBe(validProps.state);
    expect(farm.totalArea).toBe(validProps.totalArea);
    expect(farm.arableArea).toBe(validProps.arableArea);
    expect(farm.vegetationArea).toBe(validProps.vegetationArea);
  });

  it('should throw a DomainValidationException if any required prop is missing', () => {
    const invalidProps: FarmProps = {
      producerId: '',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      landUse: 'Some land use',
    };

    expect(() => Farm.create(invalidProps)).toThrow(DomainValidationException);
  });

  it('should call FarmAreaValidationService when creating a farm', () => {
    const validProps: FarmProps = {
      producerId: 'producer-123',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      landUse: 'Some land use',
    };

    Farm.create(validProps);

    expect(
      FarmAreaValidationService.validateTotalUsedArea,
    ).toHaveBeenCalledWith(
      validProps.arableArea,
      validProps.vegetationArea,
      validProps.totalArea,
    );
  });

  it('should update arable and vegetation areas successfully', () => {
    const validProps: FarmProps = {
      producerId: 'producer-123',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      landUse: 'Some land use',
    };

    const farm = Farm.create(validProps);

    expect(farm.arableArea).toBe(600);
    expect(farm.vegetationArea).toBe(400);
  });
});
