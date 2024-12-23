import { Crop } from './Crop';
import { DomainValidationException } from '../shared/domain/DomainValidationException';

describe('Crop', () => {
  it('should throw a DomainValidationException if name is missing or invalid', () => {
    const invalidProps = {
      name: undefined,
    };

    expect(() => Crop.create(invalidProps)).toThrow(
      new DomainValidationException('name is null or undefined'),
    );

    invalidProps.name = null;

    expect(() => Crop.create(invalidProps)).toThrow(
      new DomainValidationException('name is null or undefined'),
    );
  });

  it('should create a Crop when name is valid', () => {
    const validProps = {
      name: 'Wheat',
    };

    const crop = Crop.create(validProps);

    expect(crop).toBeInstanceOf(Crop);
    expect(crop.name).toBe(validProps.name);
  });
});
