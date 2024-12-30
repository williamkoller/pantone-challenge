import { IDomainEvent } from '@app/shared/domain/events/DomainEvents.interface';
import { UniqueEntityId } from '@app/shared/domain/UniqueEntityId';
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
