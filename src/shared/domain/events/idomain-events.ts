import { UniqueEntityId } from '../unique-entity-id';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityId;
}
