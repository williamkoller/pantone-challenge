import { CPF, CPFProps } from './cpf';
import { DomainValidationException } from './domain-validation-exception';
import { CommonUtils } from '../utils/CommonUtils';

jest.mock('../utils/CommonUtils', () => ({
  CommonUtils: {
    isValidCPF: jest.fn(),
  },
}));

describe('CPF', () => {
  describe('create', () => {
    it('should create a CPF object with a valid CPF number', () => {
      const props: CPFProps = { number: '123.456.789-09' };
      (CommonUtils.isValidCPF as jest.Mock).mockReturnValue(true);

      const cpf = CPF.create(props);

      expect(cpf).toBeDefined();
      expect(cpf.number).toBe(props.number);
      expect(cpf.formatted).toBe('123.456.789-09');
    });

    it('should throw an error if CPF is invalid', () => {
      const props: CPFProps = { number: '123.456.789-00' };
      (CommonUtils.isValidCPF as jest.Mock).mockReturnValue(false);

      expect(() => CPF.create(props)).toThrow(DomainValidationException);
      expect(() => CPF.create(props)).toThrow('CPF 12345678900 is not valid.');
    });

    it('should throw an error if CPF number is null or undefined', () => {
      const props: CPFProps = { number: null as unknown as string };

      expect(() => CPF.create(props)).toThrow(DomainValidationException);
      expect(() => CPF.create(props)).toThrow('number is null or undefined');
    });

    it('should throw an error if CPF number is empty', () => {
      const props: CPFProps = { number: '' };

      expect(() => CPF.create(props)).toThrow(DomainValidationException);
      expect(() => CPF.create(props)).toThrow('number is null or undefined');
    });
  });

  describe('formatted', () => {
    it('should return the CPF in formatted form', () => {
      const props: CPFProps = { number: '12345678909' };
      (CommonUtils.isValidCPF as jest.Mock).mockReturnValue(true);
      const cpf = CPF.create(props);

      expect(cpf.formatted).toBe('123.456.789-09');
    });
  });
});
