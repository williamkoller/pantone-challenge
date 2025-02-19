import { Inject, Injectable } from '@nestjs/common';
import { IDeleteUserUseCase, Input } from './idelete-user-usecase';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';
import { UserRepository } from '../../../../data/db/user/user-repository';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) throw new UserNotFoundException();
    await this.userRepository.delete(user.id.toString());
  }
}
