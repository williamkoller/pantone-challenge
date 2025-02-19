import { Guard, IGuardArgument } from '../../shared/guards/guard';
import { AggregateRoot } from '../../shared/domain/aggregate-root/aggregate-root';
import { DomainValidationException } from '../../shared/domain/errors/domain-validation-exception';
import { UserCreatedEvent } from '../../shared/domain/events/user/user-created-event';
import { UniqueEntityId } from '../../shared/domain/unique-entity-id/unique-entity-id';

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

  setName(name: string): void {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  setEmail(email: string): void {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  setPassword(password: string): void {
    this.props.password = password;
  }

  get role(): UserRoleEnum {
    return this.props.role;
  }

  setRole(role: UserRoleEnum): void {
    this.props.role;
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
