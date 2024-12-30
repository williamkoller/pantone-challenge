import { IDomainEvent } from '@app/shared/domain/events/idomain-events';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
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
