import { cnpj } from 'cpf-cnpj-validator';
import { DomainValidationException } from '@app/shared/domain/domain-validation-exception';
import { ValueObject } from '@app/shared/domain/value-object';
import { Guard } from '@app/shared/guards/guard';
import { CommonValidation } from '@app/shared/validation/common-validation';

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
    const isValid = CommonValidation.isValidCNPJ(rawCNPJ);
    return new CNPJ({ number, isValid });
  }
}
