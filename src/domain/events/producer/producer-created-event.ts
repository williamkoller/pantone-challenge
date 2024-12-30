import { IDomainEvent } from '@app/shared/domain/events/idomain-events';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Producer } from '../../producer/producer';

export class ProducerCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public producer: Producer;

  constructor(producer: Producer) {
    this.dateTimeOccurred = new Date();
    this.producer = producer;
  }

  getAggregateId(): UniqueEntityId {
    return this.producer.id;
  }
}
