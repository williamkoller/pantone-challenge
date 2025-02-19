import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { IGetUserUseCase, Input, Output } from './iget-user-usecase';
import { UserRepository } from '../../../../data/db/user/user-repository';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) throw new UserNotFoundException();
    return UserMapper.toDTO(user);
  }
}
