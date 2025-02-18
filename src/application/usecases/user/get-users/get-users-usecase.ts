import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersUseCase, Output } from './iget-users-usecase';
import { UserRepository } from '../../../../domain/repositories/user/user-repository';
import { UserMapper } from '../../../mappers/user/user-mapper';

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
