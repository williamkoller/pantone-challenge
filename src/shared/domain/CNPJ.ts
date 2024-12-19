import { cnpj } from 'cpf-cnpj-validator';
import { DomainValidationException } from '@app/shared/domain/DomainValidationException';
import { ValueObject } from '@app/shared/domain/ValueObject';
import { Guard } from '@app/shared/guards/Guard';
import { CommonUtils } from '@app/shared/utils/CommonUtils';

interface CNPJProps {
  number: string;
  isValid: boolean;
}

export class CNPJ extends ValueObject<CNPJProps> {
  private constructor(props: CNPJProps) {
    super(props);
  }

  get number(): string {
    return this.props.number;
  }
  get formatted(): string {
    return cnpj.format(this.props.number);
  }
  get isValid(): boolean {
    return this.props.isValid;
  }
  public static removeFormat(cnpj: string): string {
    return cnpj.replace(/[^\d]+/g, '');
  }
  public static create(number: string): CNPJ {
    const nullGuard = Guard.againstNullOrUndefined(number, 'number');
    if (nullGuard.isFailure)
      throw new DomainValidationException(nullGuard.getErrorValue());

    const rawCNPJ = CNPJ.removeFormat(number);
    const isValid = CommonUtils.isValidCNPJ(rawCNPJ);
    return new CNPJ({ number, isValid });
  }
}
