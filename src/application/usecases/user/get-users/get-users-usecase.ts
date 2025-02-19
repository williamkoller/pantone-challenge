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
    const limitDefault = Math.min(input.limit ?? 1000, 1000);
    const offsetDefault = Math.max(input.offset ?? 1, 1);

    const { users, total } = await this.userRepository.findAll(
      limitDefault,
      (offsetDefault - 1) * limitDefault,
    );

    const totalPages = Math.ceil(total / limitDefault);
    const page = offsetDefault > totalPages ? totalPages : offsetDefault;

    return PaginationMapper.toResult<ReturnType<typeof UserMapper.toDTO>[]>({
      limit: limitDefault,
      page,
      total,
      data: users.map(UserMapper.toDTO),
    }) as unknown as any;
  }
}
