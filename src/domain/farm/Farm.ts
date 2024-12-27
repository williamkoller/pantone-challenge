import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { DomainValidationException } from '../../shared/domain/DomainValidationException';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Guard, IGuardArgument } from '../../shared/guards/Guard';
import { FarmCreatedEvent } from '../events/Farm/FarmCreatedEvent';
import { Producer } from '../producer/Producer';
import { FarmAreaValidationService } from '../services/farm/FarmAreaValidationService';

export type FarmProps = {
  producerId: string;
  producer?: Producer | null;
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

  set totalArea(value: number) {
    this.props.totalArea = value;
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

  get producer(): Producer | null {
    return this.props.producer || null;
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

    const isNewFarm = !!id === false;

    const farm = new Farm(props, id);

    if (isNewFarm) farm.addDomainEvent(new FarmCreatedEvent(farm));

    return farm;
  }

  public static calculateTotalArea(
    arableArea: number,
    vegetationArea: number,
  ): number {
    return FarmAreaValidationService.calculateTotalUsedArea(
      arableArea,
      vegetationArea,
    );
  }

  public updateFarm(props: Partial<FarmProps>): Farm {
    if (props.name) this.props.name = props.name;
    if (props.state) this.props.state = props.state;
    if (props.totalArea) this.props.totalArea = props.totalArea;
    if (props.arableArea) this.props.arableArea = props.arableArea;
    if (props.vegetationArea) this.props.vegetationArea = props.vegetationArea;
    if (props.producerId) this.props.producerId = props.producerId;
    this.props.createdAt;
    this.props.updatedAt = new Date();

    FarmAreaValidationService.validate(
      this.props.arableArea,
      this.props.vegetationArea,
      this.props.totalArea,
    );

    return this;
  }
}
