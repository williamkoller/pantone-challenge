import { DomainValidationException } from '../../shared/domain/errors/domain-validation-exception';
import { User, UserProps, UserRoleEnum } from './user';

describe(User.name, () => {
  it('should create a user with valid props', () => {
    const validProps: UserProps = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'password',
      role: UserRoleEnum.ADMIN,
    };
    const user = User.create(validProps);

    expect(user.name).toBe(validProps.name);
    expect(user.email).toEqual(validProps.email);
    expect(user.password).toBe(validProps.password);
    expect(user.role).toBe(validProps.role);
  });

  it('should throw a DomainValidationException if any required prop is missing', () => {
    const invalidProps: UserProps = {
      name: '',
      email: '',
      password: '',
      role: UserRoleEnum.ADMIN,
    };

    expect(() => User.create(invalidProps)).toThrow(DomainValidationException);
  });
});
