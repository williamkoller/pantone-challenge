import { Guard, IGuardArgument } from '../../shared/guards/guard';
import { AggregateRoot } from '../aggregate-root/aggregate-root';
import { DomainValidationException } from '../errors/domain-validation-exception';
import { UserCreatedEvent } from '../events/user/user-created-event';
import { UniqueEntityId } from '../unique-entity-id/unique-entity-id';

export enum UserRoleEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export type UserProps = {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
};

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): UserRoleEnum {
    return this.props.role;
  }

  public static create(props: UserProps, id?: UniqueEntityId): User {
    const guardArgs: IGuardArgument[] = [
      {
        argument: props.name,
        argumentName: 'name',
      },
      {
        argument: props.email,
        argumentName: 'email',
      },
      {
        argument: props.password,
        argumentName: 'password',
      },
      {
        argument: props.role,
        argumentName: 'role',
      },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure)
      throw new DomainValidationException(guardResult.getErrorValue());

    const user = new User(props, id);

    const isNewUser = !!id === false;

    if (isNewUser) user.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }
}
