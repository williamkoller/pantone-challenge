import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { DomainValidationException } from '../../shared/domain/DomainValidationException';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Guard, IGuardArgument } from '../../shared/guards/Guard';

export type CropProps = {
  name: string;
};

export class Crop extends AggregateRoot<CropProps> {
  constructor(props: CropProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  public static create(props: CropProps, id?: UniqueEntityId): Crop {
    const guardArgs: IGuardArgument[] = [
      { argument: props.name, argumentName: 'name' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    return new Crop(props, id);
  }
}
