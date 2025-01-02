import { CommonValidation } from '@app/shared/validation/common-validation';
import { CNPJ } from './cnpj';
import { DomainValidationException } from './domain-validation-exception';

describe('CNPJ', () => {
  describe('formatted method', () => {
    it('should correctly format a raw CNPJ number', () => {
      const cnpj = CNPJ.create('55215153000148');
      expect(cnpj.formatted).toEqual('55.215.153/0001-48');
    });
  });

  describe('create method', () => {
    it('should successfully create a valid CNPJ object', () => {
      jest.spyOn(CommonValidation, `isValidCNPJ`).mockReturnValue(true);

      const result = CNPJ.create('55215153000148');
      expect(result.number).toEqual('55215153000148');
      expect(result.isValid).toBeTruthy();
    });

    it('should fail to create a CNPJ object with an invalid number', () => {
      jest.spyOn(CommonValidation, `isValidCNPJ`).mockReturnValue(false);

      const result = CNPJ.create('00000000000000');
      expect(result.isValid).toBeFalsy();
    });

    it('should fail to create a CNPJ object with an undefined number', () => {
      const result = () => CNPJ.create(undefined);
      expect(result).toThrow(DomainValidationException);
      expect(result).toThrow('number is null or undefined');
    });
  });
});
