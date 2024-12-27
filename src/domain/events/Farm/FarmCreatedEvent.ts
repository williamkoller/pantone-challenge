import { IDomainEvent } from '../../../shared/domain/events/DomainEvents.interface';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Farm } from '../../farm/Farm';

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
