import { DomainValidationException } from '@app/shared/domain/DomainValidationException';

export class FarmAreaValidationService {
  /**
   * Validates that the sum of arable and vegetation areas does not exceed the total area.
   *
   * @param arableArea - Arable area.
   * @param vegetationArea - Vegetation area.
   * @param totalArea - Total area of the farm.
   */
  public static validateTotalUsedArea(
    arableArea: number,
    vegetationArea: number,
    totalArea: number,
  ): void {
    if (arableArea < 0 || vegetationArea < 0 || totalArea < 0) {
      throw new DomainValidationException(
        'The arable, vegetation and totalArea must be positive values.',
      );
    }
  }
}
