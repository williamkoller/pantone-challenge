import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from './get-user-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { UserRoleEnum } from '../../../../domain/user/user';

const mockUserRepository = {
  findById: jest.fn(),
};

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepository = module.get<typeof mockUserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UserNotFoundException if user does not exist', async () => {
    userRepository.findById.mockResolvedValueOnce(null);
    await expect(
      getUserUseCase.execute({ userId: 'non-existent-id' }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should return user data successfully', async () => {
    const user = {
      id: 'valid-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'client',
    };
    userRepository.findById.mockResolvedValueOnce(user);
    jest.spyOn(UserMapper, 'toDTO').mockReturnValue({
      id: 'valid-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: UserRoleEnum.CLIENT,
    });

    await expect(
      getUserUseCase.execute({ userId: 'valid-id' }),
    ).resolves.toEqual({
      id: 'valid-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'client',
    });
  });
});
