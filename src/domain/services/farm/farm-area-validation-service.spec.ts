import { DomainValidationException } from '@app/shared/domain/domain-validation-exception';
import { FarmAreaValidationService } from './farm-area-validation-service';

describe('FarmAreaValidationService', () => {
  it('should throw a DomainValidationException if any area is negative', () => {
    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(-1, 10, 20),
    ).toThrow(
      new DomainValidationException(
        'The arable, vegetation and totalArea must be positive values.',
      ),
    );

    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(10, -1, 20),
    ).toThrow(
      new DomainValidationException(
        'The arable, vegetation and totalArea must be positive values.',
      ),
    );

    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(10, 10, -1),
    ).toThrow(
      new DomainValidationException(
        'The arable, vegetation and totalArea must be positive values.',
      ),
    );
  });

  it('should not throw any exception if all areas are positive', () => {
    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(10, 10, 20),
    ).not.toThrow();

    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(0, 0, 0),
    ).not.toThrow();

    expect(() =>
      FarmAreaValidationService.validateTotalUsedArea(5, 15, 20),
    ).not.toThrow();
  });
});
