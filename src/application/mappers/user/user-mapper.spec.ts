import { UserMapper } from './user-mapper';
import { UniqueEntityId } from '../../../shared/domain/unique-entity-id/unique-entity-id';
import { User, UserRoleEnum } from '../../../domain/user/user';
import { UserAttributes } from '../../../infrastructure/database/models/user-model';

describe('UserMapper', () => {
  const userId = '123';
  const userProps = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
    role: UserRoleEnum.ADMIN,
  };

  describe('toPersistence', () => {
    it('should map a User domain entity to persistence format', () => {
      const user = User.create(userProps, new UniqueEntityId(userId));

      const result = UserMapper.toPersistence(user);

      expect(result).toEqual({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        role: UserRoleEnum.ADMIN,
      });
    });
  });

  describe('toDomain', () => {
    it('should map a raw database object to a User domain entity', () => {
      const rawUser: UserAttributes = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        role: UserRoleEnum.ADMIN,
      };

      const result = UserMapper.toDomain(rawUser);

      expect(result).toBeInstanceOf(User);
      expect(result.id.toString()).toBe(userId);
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.password).toBe('hashed_password');
      expect(result.role).toBe('admin');
    });
  });

  describe('toDTO', () => {
    it('should map a User domain entity to a DTO format', () => {
      const user = User.create(userProps, new UniqueEntityId(userId));

      const result = UserMapper.toDTO(user);

      expect(result).toEqual({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        role: 'admin',
      });
    });
  });
});
