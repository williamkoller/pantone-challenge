import { DomainValidationException } from '../../shared/domain/domain-validation-exception';
import { FarmCrop, FarmCropProps } from './farm-crop';

describe('FarmCrop', () => {
  it('should create a valid FarmCrop', () => {
    const validProps: FarmCropProps = {
      farmId: 'farm-123',
      cropId: 'crop-456',
      seasonYear: 2024,
      plantedArea: 500,
    };

    const farmCrop = FarmCrop.create(validProps);

    expect(farmCrop.farmId).toBe(validProps.farmId);
    expect(farmCrop.cropId).toBe(validProps.cropId);
    expect(farmCrop.seasonYear).toBe(validProps.seasonYear);
    expect(farmCrop.plantedArea).toBe(validProps.plantedArea);
  });

  it('should throw a DomainValidationException if any required prop is missing', () => {
    const invalidProps: FarmCropProps = {
      farmId: '',
      cropId: 'crop-456',
      seasonYear: 2024,
      plantedArea: 500,
    };

    expect(() => FarmCrop.create(invalidProps)).toThrow(
      DomainValidationException,
    );
  });

  it('should throw a DomainValidationException if plantedArea is missing or invalid', () => {
    const invalidProps: FarmCropProps = {
      farmId: 'farm-123',
      cropId: 'crop-456',
      seasonYear: 2024,
      plantedArea: 0,
    };

    expect(() => FarmCrop.create(invalidProps)).toThrow(
      new DomainValidationException('Planted area must be greater than zero'),
    );
  });

  it('should return the correct values for all properties', () => {
    const validProps: FarmCropProps = {
      farmId: 'farm-123',
      cropId: 'crop-456',
      seasonYear: 2024,
      plantedArea: 500,
    };

    const farmCrop = FarmCrop.create(validProps);

    expect(farmCrop.farmId).toBe('farm-123');
    expect(farmCrop.cropId).toBe('crop-456');
    expect(farmCrop.seasonYear).toBe(2024);
    expect(farmCrop.plantedArea).toBe(500);
  });
});
