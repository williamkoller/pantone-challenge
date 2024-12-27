import { DomainValidationException } from '../../shared/domain/DomainValidationException';
import { FarmAreaValidationService } from '../services/farm/FarmAreaValidationService';
import { Farm, FarmProps } from './Farm';

jest.mock('../services/farm/FarmAreaValidationService');

describe('Farm', () => {
  it('should create a valid Farm', () => {
    const validProps: FarmProps = {
      producerId: 'producer-123',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
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
    };

    Farm.create(validProps);

    expect(FarmAreaValidationService.validate).toHaveBeenCalledWith(
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
    };

    const farm = Farm.create(validProps);

    expect(farm.arableArea).toBe(600);
    expect(farm.vegetationArea).toBe(400);
  });
});
