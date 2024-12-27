import { DomainValidationException } from '../../../shared/domain/DomainValidationException';
import { FarmAreaValidationService } from './FarmAreaValidationService';

describe('FarmAreaValidationService', () => {
  it('should throw a DomainValidationException if arableArea or vegetationArea is negative', () => {
    expect(() => FarmAreaValidationService.validate(-1, 10, 20)).toThrow(
      new DomainValidationException(
        'The arable and vegetation areas must be positive values.',
      ),
    );

    expect(() => FarmAreaValidationService.validate(10, -1, 20)).toThrow(
      new DomainValidationException(
        'The arable and vegetation areas must be positive values.',
      ),
    );
  });

  it('should throw a DomainValidationException if the sum of arableArea and vegetationArea exceeds totalArea', () => {
    const arableArea = 15;
    const vegetationArea = 10;
    const totalArea = 20;

    expect(() =>
      FarmAreaValidationService.validate(arableArea, vegetationArea, totalArea),
    ).toThrow(
      new DomainValidationException(
        `The sum of the arable area (${arableArea}) and vegetation area (${vegetationArea}) cannot exceed the total area (${totalArea}). The total used area is ${arableArea + vegetationArea}.`,
      ),
    );
  });

  it('should not throw an exception if arableArea and vegetationArea are valid', () => {
    const arableArea = 10;
    const vegetationArea = 5;
    const totalArea = 20;

    expect(() =>
      FarmAreaValidationService.validate(arableArea, vegetationArea, totalArea),
    ).not.toThrow();
  });
});
