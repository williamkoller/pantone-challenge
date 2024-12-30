import { IDomainEvent } from '@app/shared/domain/events/DomainEvents.interface';
import { UniqueEntityId } from '@app/shared/domain/UniqueEntityId';
import { Farm } from '../../farm/farm';

export class FarmCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public farm: Farm;

  constructor(farm: Farm) {
    this.dateTimeOccurred = new Date();
    this.farm = farm;
  }

  getAggregateId(): UniqueEntityId {
    return this.farm.id;
  }
}
