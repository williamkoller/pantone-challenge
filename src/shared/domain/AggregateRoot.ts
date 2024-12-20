import { Logger } from '@nestjs/common';
import { Entity } from './Entity';
import { DomainEvents } from './events/DomainEvents';
import { IDomainEvent } from './events/DomainEvents.interface';
import { UniqueEntityId } from './UniqueEntityId';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];
  private logger = new Logger(AggregateRoot.name);

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    this.logger.log(
      `[Domain Event Created]: ${this.constructor.name} ==> ${domainEvent.constructor.name}`,
    );
  }
}
