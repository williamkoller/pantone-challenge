import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersUseCase, Input, Output } from './iget-users-usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { PaginationMapper } from '../../../../shared/mappers/pagination-mapper';

@Injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const limit = Math.min(input.limit || 1000, 1000);
    const offset = Math.max((input.offset || 1) - 1, 0) * limit;
    const { users, total } = await this.userRepository.findAll(limit, offset);

    return PaginationMapper.toResult({
      limit,
      page: Math.min(
        Math.ceil((offset + limit) / limit),
        Math.ceil(total / limit),
      ),
      total,
      data: users.map(UserMapper.toDTO),
    }) as unknown as Output;
  }
}
