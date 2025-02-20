import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from './delete-user-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';

const mockUserRepository = {
  findById: jest.fn(),
  delete: jest.fn(),
};

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: { findById: jest.Mock<any, any, any>; delete: jest.Mock<any, any, any> };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepository = module.get(UserRepository) as unknown as typeof mockUserRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UserNotFoundException if user does not exist', async () => {
    userRepository.findById.mockResolvedValueOnce(null);
    await expect(
      deleteUserUseCase.execute({ userId: 'non-existent-id' }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should delete a user successfully', async () => {
    userRepository.findById.mockResolvedValueOnce({ id: 'valid-id' });
    userRepository.delete.mockResolvedValueOnce(undefined);

    await expect(
      deleteUserUseCase.execute({ userId: 'valid-id' }),
    ).resolves.not.toThrow();
    expect(userRepository.delete).toHaveBeenCalledWith('valid-id');
  });
});
