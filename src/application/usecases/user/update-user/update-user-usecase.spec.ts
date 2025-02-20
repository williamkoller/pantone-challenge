import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { Hasher } from '../../../../data/protocols/cryptography/hasher';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';
import { BadRequestException } from '@nestjs/common';
import { CommonValidation } from '../../../../shared/validation/common-validation';
import { User, UserRoleEnum } from '../../../../domain/user/user';
import { UniqueEntityId } from '../../../../shared/domain/unique-entity-id/unique-entity-id';

jest.mock('sequelize-transactional-decorator', () => ({
  Transactional: () => () => ({}),
}));

const mockUserRepository = {
  findById: jest.fn(),
  update: jest.fn(),
  setName: jest.fn(),
  setEmail: jest.fn(),
  setPassword: jest.fn(),
  setRole: jest.fn(),
};

const mockHasher = {
  hash: jest.fn().mockResolvedValue('new_hashed_password'),
};

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let hasher: Hasher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: Hasher, useValue: mockHasher },
      ],
    }).compile();

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = module.get<UserRepository>(
      UserRepository,
    ) as jest.Mocked<UserRepository>;
    hasher = module.get<Hasher>(Hasher);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a user successfully', async () => {
    const user = User.create(
      {
        name: 'User One',
        email: 'user1@example.com',
        password: 'hashed_password',
        role: UserRoleEnum.CLIENT,
      },
      new UniqueEntityId('1'),
    );
    jest.spyOn(CommonValidation, 'validateEmailAddress').mockReturnValue(true);
    userRepository.findById.mockResolvedValueOnce(user);
    userRepository.update.mockResolvedValueOnce(user);
    (hasher.hash as jest.Mock).mockResolvedValueOnce('new_hashed_password');

    jest.spyOn(UserMapper, 'toDTO').mockImplementation((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    }));

    const result = await updateUserUseCase.execute({
      userId: '1',
      name: 'Updated User',
      password: 'new_hashed_password',
    });

    expect(result).toEqual({
      id: new UniqueEntityId('1'),
      name: 'Updated User',
      password: 'new_hashed_password',
      email: 'user1@example.com',
      role: 'client',
    });
  });

  it('should throw UserNotFoundException if user does not exist', async () => {
    userRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updateUserUseCase.execute({ userId: 'invalid-id' }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should throw BadRequestException if email is invalid', async () => {
    const user = User.create(
      {
        name: 'User One',
        email: 'user1@example.com',
        password: 'hashed_password',
        role: UserRoleEnum.CLIENT,
      },
      new UniqueEntityId('1'),
    );
    userRepository.findById.mockResolvedValueOnce(user);
    jest
      .spyOn(CommonValidation, 'validateEmailAddress')
      .mockReturnValueOnce(false);

    await expect(
      updateUserUseCase.execute({ userId: '1', email: 'invalid-email' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should update only provided fields', async () => {
    const user = User.create(
      {
        name: 'User One',
        email: 'user1@example.com',
        password: 'hashed_password',
        role: UserRoleEnum.CLIENT,
      },
      new UniqueEntityId('1'),
    );
    jest.spyOn(CommonValidation, 'validateEmailAddress').mockReturnValue(true);
    userRepository.findById.mockResolvedValueOnce(user);
    userRepository.update.mockResolvedValueOnce(user);

    await updateUserUseCase.execute({
      userId: '1',
      name: 'Updated Name',
      password: 'new_hashed_password',
      role: UserRoleEnum.ADMIN,
    });

    const setEmailSpy = jest.spyOn(user, 'setEmail');
    const setPasswordSpy = jest.spyOn(user, 'setPassword');
    const setRoleSpy = jest.spyOn(user, 'setRole');

    expect(setEmailSpy).not.toHaveBeenCalled();
    expect(setPasswordSpy).not.toHaveBeenCalled();
    expect(setRoleSpy).not.toHaveBeenCalled();
  });
});
