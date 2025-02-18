import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateUserUseCase, Input, Output } from './icreate-user-usecase';
import { UserRepository } from '../../../../domain/repositories/user/user-repository';
import { User, UserRoleEnum } from '../../../../domain/user/user';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { CommonValidation } from '../../../../shared/validation/common-validation';
import { UserConflictException } from '../../../exceptions/user/user-conflict-exception';
import { Transactional } from 'sequelize-transactional-decorator';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) throw new UserConflictException();
    const email = CommonValidation.validateEmailAddress(input.email);
    if (!email) throw new BadRequestException('Invalid email address');
    const role =
      input.role === UserRoleEnum.ADMIN
        ? UserRoleEnum.ADMIN
        : UserRoleEnum.CLIENT;

    console.log(role);

    const user = User.create({
      name: input.name,
      email: input.email,
      password: input.password,
      role,
    });
    await this.userRepository.create(user);
    return UserMapper.toDTO(user);
  }
}
