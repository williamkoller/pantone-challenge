import { cpf } from 'cpf-cnpj-validator';
import { ValueObject } from './value-object';
import { Guard } from '../guards/guard';
import { DomainValidationException } from './domain-validation-exception';
import { CommonValidation } from '../validation/common-validation';

export type CPFProps = {
  number: string;
};

export class CPF extends ValueObject<CPFProps> {
  private constructor(props: CPFProps) {
    super(props);
  }

  get number(): string {
    return this.props.number;
  }

  get formatted(): string {
    return cpf.format(this.props.number);
  }

  public static create(props: CPFProps): CPF {
    const nullGuard = Guard.againstNullOrUndefined(props.number, 'number');

    if (nullGuard.isFailure)
      throw new DomainValidationException(nullGuard.getErrorValue());

    const rawCPF = props.number.replace(/[^\d]+/g, '');
    if (!CommonValidation.isValidCPF(rawCPF)) {
      throw new DomainValidationException(`CPF ${rawCPF} is not valid.`);
    }
    return new CPF(props);
  }
}
