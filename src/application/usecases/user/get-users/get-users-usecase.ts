import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersUseCase, Output } from './iget-users-usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';

@Injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<Output> {
    const users = await this.userRepository.findAll();
    return users.map(UserMapper.toDTO);
  }
}
