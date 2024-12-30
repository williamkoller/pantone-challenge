import { AggregateRoot } from '@app/shared/domain/aggregate-root';
import { DomainValidationException } from '@app/shared/domain/domain-validation-exception';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Guard, IGuardArgument } from '@app/shared/guards/guard';

export type FarmCropProps = {
  farmId: string;
  cropId: string;
  seasonYear: number;
  plantedArea: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class FarmCrop extends AggregateRoot<FarmCropProps> {
  constructor(props: FarmCropProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get farmId(): string {
    return this.props.farmId;
  }

  get cropId(): string {
    return this.props.cropId;
  }

  get seasonYear(): number {
    return this.props.seasonYear;
  }

  get plantedArea(): number {
    return this.props.plantedArea;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public static create(props: FarmCropProps, id?: UniqueEntityId): FarmCrop {
    const guardArgs: IGuardArgument[] = [
      { argument: props.farmId, argumentName: 'farmId' },
      { argument: props.cropId, argumentName: 'cropId' },
      { argument: props.seasonYear, argumentName: 'seasonYear' },
      { argument: props.plantedArea, argumentName: 'plantedArea' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    if (props.plantedArea <= 0) {
      throw new DomainValidationException(
        'Planted area must be greater than zero',
      );
    }

    return new FarmCrop(props, id);
  }
}
