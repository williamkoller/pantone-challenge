import { IDomainEvent } from '../../../shared/domain/events/DomainEvents.interface';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Producer } from '../../producer/Producer';

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
