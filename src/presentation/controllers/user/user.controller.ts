import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { CreateUserBodyDTO } from '../../../application/usecases/user/create-user/create-user-dto';
import { GetUserRequestParamsDTO } from '../../../application/usecases/user/get-user/get-user-dto';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject(IGetUserUseCase)
    private readonly getUserUseCase: IGetUserUseCase,
    @Inject(IGetUsersUseCase)
    private readonly getUsersUseCase: IGetUsersUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBodyDTO) {
    return await this.createUserUseCase.execute(body);
  }

  @Get(':userId')
  async get(@Param() params: GetUserRequestParamsDTO) {
    return await this.getUserUseCase.execute(params);
  }

  @Get()
  async getAll() {
    return await this.getUsersUseCase.execute();
  }
}
