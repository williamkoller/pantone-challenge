import { cpf } from 'cpf-cnpj-validator';
import { ValueObject } from './ValueObject';
import { Guard } from '../guards/Guard';
import { DomainValidationException } from './DomainValidationException';
import { CommonUtils } from '../utils/CommonUtils';

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
    if (!CommonUtils.isValidCPF(rawCPF)) {
      throw new DomainValidationException(`CPF ${rawCPF} is not valid.`);
    }
    return new CPF(props);
  }
}
