import { DomainValidationException } from '@app/shared/domain/domain-validation-exception';
import { Crop } from './crop';

describe('Crop', () => {
  it('should throw a DomainValidationException if any required property is missing or invalid', () => {
    const invalidProps = {
      farmId: undefined,
      cropType: undefined,
      year: undefined,
    };

    expect(() => Crop.create(invalidProps)).toThrow(
      new DomainValidationException('farmId is null or undefined'),
    );

    invalidProps.farmId = 'some-farm-id';
    expect(() => Crop.create(invalidProps)).toThrow(
      new DomainValidationException('cropType is null or undefined'),
    );

    invalidProps.cropType = 'Wheat';
    expect(() => Crop.create(invalidProps)).toThrow(
      new DomainValidationException('year is null or undefined'),
    );

    invalidProps.year = 2024;
    expect(() => Crop.create(invalidProps)).not.toThrow();
  });

  it('should create a Crop when all required properties are valid', () => {
    const validProps = {
      farmId: 'some-farm-id',
      cropType: 'Wheat',
      year: 2024,
    };

    const crop = Crop.create(validProps);

    expect(crop).toBeInstanceOf(Crop);
    expect(crop.farmId).toBe(validProps.farmId);
    expect(crop.cropType).toBe(validProps.cropType);
    expect(crop.year).toBe(validProps.year);
  });
});
