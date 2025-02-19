import { UniqueEntityId } from '../../../shared/domain/unique-entity-id/unique-entity-id';
import { User } from '../../../domain/user/user';
import { UserAttributes } from '../../../infrastructure/database/models/user-model';
import { Mapper } from '../../../shared/types/mapper';

export class UserMapper extends Mapper<User, UserAttributes>() {
  static toPersistence(domain: User): UserAttributes {
    return {
      id: domain.id.toString(),
      name: domain.name,
      email: domain.email,
      password: domain.password,
      role: domain.role,
    };
  }

  static toDomain(raw: UserAttributes): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }
}
