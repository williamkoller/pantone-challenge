import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersUseCase } from './get-users-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { PaginationMapper } from '../../../../shared/mappers/pagination-mapper';

const mockUserRepository = {
  findAll: jest.fn(),
};

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;
  let userRepository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    userRepository = module.get<typeof mockUserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated users successfully', async () => {
    const users = [
      {
        id: '1',
        name: 'User One',
        email: 'user1@example.com',
        password: 'hashed_password',
        role: 'client',
      },
      {
        id: '2',
        name: 'User Two',
        email: 'user2@example.com',
        password: 'hashed_password',
        role: 'admin',
      },
    ];
    const total = 2;
    userRepository.findAll.mockResolvedValueOnce({ users, total });

    jest.spyOn(UserMapper, 'toDTO').mockImplementation((user) => ({
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
    }));

    const result = await getUsersUseCase.execute({ limit: 10, offset: 1 });

    expect(result).toEqual(
      PaginationMapper.toResult({
        limit: 10,
        page: 1,
        total,
        data: users.map((user) => ({
          id: user.id,
          name: user.name,
          password: user.password,
          email: user.email,
          role: user.role,
        })),
      }),
    );
  });

  it('should return empty pagination if no users found', async () => {
    userRepository.findAll.mockResolvedValueOnce({ users: [], total: 0 });

    const result = await getUsersUseCase.execute({ limit: 10, offset: 1 });

    expect(result).toEqual(
      PaginationMapper.toResult({
        limit: 10,
        page: 0,
        total: 0,
        data: [],
      }),
    );
  });
});
