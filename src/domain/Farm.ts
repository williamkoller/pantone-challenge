import { AggregateRoot } from '../shared/domain/AggregateRoot';
import { DomainValidationException } from '../shared/domain/DomainValidationException';
import { UniqueEntityId } from '../shared/domain/UniqueEntityId';
import { Guard, IGuardArgument } from '../shared/guards/Guard';
import { FarmAreaValidationService } from './services/FarmAreaValidationService';

export type FarmProps = {
  producerId: string;
  name: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class Farm extends AggregateRoot<FarmProps> {
  constructor(props: FarmProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get producerId(): string {
    return this.props.producerId;
  }

  get name(): string {
    return this.props.name;
  }

  get state(): string {
    return this.props.state;
  }

  get totalArea(): number {
    return this.props.totalArea;
  }

  get arableArea(): number {
    return this.props.arableArea;
  }

  get vegetationArea(): number {
    return this.props.vegetationArea;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  public static create(props: FarmProps, id?: UniqueEntityId): Farm {
    const guardArgs: IGuardArgument[] = [
      { argument: props.producerId, argumentName: 'producerId' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.state, argumentName: 'state' },
      { argument: props.totalArea, argumentName: 'totalArea' },
      { argument: props.arableArea, argumentName: 'arableArea' },
      { argument: props.vegetationArea, argumentName: 'vegetationArea' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    FarmAreaValidationService.validate(
      props.arableArea,
      props.vegetationArea,
      props.totalArea,
    );

    return new Farm(props, id);
  }

  /**
   * Updates the arable and vegetation areas of the farm.
   * @param arableArea - New arable area.
   * @param vegetationArea - New vegetation area.
   */
  public CalculateAreas(arableArea: number, vegetationArea: number): void {
    FarmAreaValidationService.validate(
      arableArea,
      vegetationArea,
      this.totalArea,
    );

    this.props.arableArea = arableArea;
    this.props.vegetationArea = vegetationArea;
    this.props.updatedAt = new Date();
  }
}
