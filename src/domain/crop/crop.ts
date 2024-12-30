import { AggregateRoot } from '@app/shared/domain/aggregate-root';
import { DomainValidationException } from '@app/shared/domain/domain-validation-exception';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Guard, IGuardArgument } from '@app/shared/guards/guard';

export type CropProps = {
  farmId: string;
  cropType: string;
  year: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class Crop extends AggregateRoot<CropProps> {
  constructor(props: CropProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get farmId(): string {
    return this.props.farmId;
  }

  get cropType(): string {
    return this.props.cropType;
  }

  get year(): number {
    return this.props.year;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public static create(props: CropProps, id?: UniqueEntityId): Crop {
    const guardArgs: IGuardArgument[] = [
      { argument: props.farmId, argumentName: 'farmId' },
      { argument: props.cropType, argumentName: 'cropType' },
      { argument: props.year, argumentName: 'year' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    return new Crop(props, id);
  }
}
