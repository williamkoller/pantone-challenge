import { AggregateRoot } from '../shared/domain/AggregateRoot';
import { CNPJ } from '../shared/domain/CNPJ';
import { CPF } from '../shared/domain/CPF';
import { DomainValidationException } from '../shared/domain/DomainValidationException';
import { UniqueEntityId } from '../shared/domain/UniqueEntityId';
import { Guard, IGuardArgument } from '../shared/guards/Guard';

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

    return new Producer(props, id);
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
