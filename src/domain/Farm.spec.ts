import { Farm, FarmProps } from './Farm';
import { DomainValidationException } from '../shared/domain/DomainValidationException';
import { FarmAreaValidationService } from './services/FarmAreaValidationService';

jest.mock('./services/FarmAreaValidationService');

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

  it('should throw an error if the areas are invalid during CalculateAreas', () => {
    const validProps: FarmProps = {
      producerId: 'producer-123',
      name: 'Farm 1',
      state: 'State 1',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
    };

    const farm = Farm.create(validProps);

    (FarmAreaValidationService.validate as jest.Mock).mockImplementationOnce(
      () => {
        throw new DomainValidationException('Invalid areas');
      },
    );

    expect(() => farm.CalculateAreas(700, 500)).toThrow(
      DomainValidationException,
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

    farm.CalculateAreas(700, 200);

    expect(farm.arableArea).toBe(700);
    expect(farm.vegetationArea).toBe(200);
    expect(farm.updatedAt).toBeInstanceOf(Date);
  });
});
