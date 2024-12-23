import { DomainValidationException } from '../../../shared/domain/DomainValidationException';

export class FarmAreaValidationService {
  /**
   * Validates that the sum of arable and vegetation areas does not exceed the total area.
   *
   * @param arableArea - Arable area.
   * @param vegetationArea - Vegetation area.
   * @param totalArea - Total area of the farm.
   */
  public static validate(
    arableArea: number,
    vegetationArea: number,
    totalArea: number,
  ): void {
    if (arableArea < 0 || vegetationArea < 0) {
      throw new DomainValidationException(
        'The arable and vegetation areas must be positive values.',
      );
    }

    const totalUsedArea = arableArea + vegetationArea;

    if (totalUsedArea > totalArea) {
      throw new DomainValidationException(
        `The sum of the arable area (${arableArea}) and vegetation area (${vegetationArea}) cannot exceed the total area (${totalArea}). The total used area is ${totalUsedArea}.`,
      );
    }
  }

  public static calculateTotalUsedArea(
    arableArea: number,
    vegetationArea: number,
  ): number {
    return arableArea + vegetationArea;
  }
}
