import { UniqueEntityId } from '../../unique-entity-id/unique-entity-id';
import { User } from '../../user/user';
import { IDomainEvent } from '../domain-events/idomain-events';

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
