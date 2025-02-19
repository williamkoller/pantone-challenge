import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Input, IUpdateUserUseCase, Output } from './iupdate-user-usecase';
import { UserNotFoundException } from '../../../exceptions/user/user-not-found-exception';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { Hasher } from '../../../../data/protocols/cryptography/hasher';
import { Transactional } from 'sequelize-transactional-decorator';
import { CommonValidation } from '../../../../shared/validation/common-validation';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(Hasher)
    private readonly hasher: Hasher,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findById(input.userId);
    if (!userExists) throw new UserNotFoundException();

    const email = CommonValidation.validateEmailAddress(input.email);
    if (!email) throw new BadRequestException('Invalid email address');

    if (input.name !== undefined) userExists.setName(input.name) ?? null;
    if (input.email !== undefined) userExists.setEmail(input.email) ?? null;
    if (input.password !== undefined)
      userExists.setPassword(await this.hasher.hash(input.password)) ?? null;
    if (input.role !== undefined) userExists.setRole(input.role) ?? null;
    const userUpdated = await this.userRepository.update(userExists);

    return UserMapper.toDTO(userUpdated);
  }
}
