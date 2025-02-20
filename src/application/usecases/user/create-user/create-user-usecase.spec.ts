import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { Hasher } from '../../../../data/protocols/cryptography/hasher';
import { UserConflictException } from '../../../exceptions/user/user-conflict-exception';
import { BadRequestException } from '@nestjs/common';
import { UserRoleEnum } from '../../../../domain/user/user';

jest.mock('sequelize-transactional-decorator', () => ({
  Transactional: () => () => ({}),
}));

const mockUserRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockHasher = {
  hash: jest.fn(),
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: typeof mockUserRepository;
  let hasher: typeof mockHasher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: Hasher, useValue: mockHasher },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(
      UserRepository,
    ) as unknown as typeof mockUserRepository;
    hasher = module.get<Hasher>(Hasher) as unknown as typeof mockHasher;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UserConflictException if email is already registered', async () => {
    userRepository.findByEmail.mockResolvedValueOnce({});
    await expect(
      createUserUseCase.execute({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: UserRoleEnum.CLIENT,
      }),
    ).rejects.toThrow(UserConflictException);
  });

  it('should throw BadRequestException for an invalid email', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null);
    await expect(
      createUserUseCase.execute({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
        role: UserRoleEnum.CLIENT,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create a new user successfully', async () => {
    userRepository.findByEmail.mockResolvedValueOnce(null);
    hasher.hash.mockResolvedValueOnce('hashed_password');
    userRepository.create.mockResolvedValueOnce({});

    const input = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: UserRoleEnum.CLIENT,
    };

    await expect(createUserUseCase.execute(input)).resolves.not.toThrow();
    expect(userRepository.create).toHaveBeenCalled();
  });
});
