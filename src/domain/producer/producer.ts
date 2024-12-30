import { AggregateRoot } from '@app/shared/domain/AggregateRoot';
import { CNPJ } from '@app/shared/domain/CNPJ';
import { CPF } from '@app/shared/domain/CPF';
import { DomainValidationException } from '@app/shared/domain/DomainValidationException';
import { UniqueEntityId } from '@app/shared/domain/UniqueEntityId';
import { Guard, IGuardArgument } from '@app/shared/guards/Guard';
import { ProducerCreatedEvent } from '../events/producer/producer-created-event';
import { Farm } from '../farm/farm';

export enum ProducerDocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export type ProducerProps = {
  name: string;
  document: CPF | CNPJ;
  documentType: ProducerDocumentType;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  farms?: Farm[] | [];
};

export class Producer extends AggregateRoot<ProducerProps> {
  constructor(props: ProducerProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get document(): CPF | CNPJ {
    return this.props.document;
  }

  get documentType(): ProducerDocumentType {
    return this.props.documentType;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get farms(): Farm[] | [] {
    return this.props.farms;
  }

  public static create(props: ProducerProps, id?: UniqueEntityId): Producer {
    const guardArgs: IGuardArgument[] = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.document, argumentName: 'document' },
      { argument: props.documentType, argumentName: 'documentType' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    if (
      ![ProducerDocumentType.CPF, ProducerDocumentType.CNPJ].includes(
        props.documentType,
      )
    ) {
      throw new DomainValidationException('Invalid document type');
    }

    const isNewPruducer = !!id === false;

    const producer = new Producer(props, id);

    if (isNewPruducer)
      producer.addDomainEvent(new ProducerCreatedEvent(producer));

    return producer;
  }

  public toUpdate(props: Partial<ProducerProps>): Producer {
    return Producer.create(
      {
        ...this.props,
        ...props,
        updatedAt: new Date(),
      },
      this._id,
    );
  }
}
