import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { GetUserRequestParamsDTO } from '../../../application/usecases/user/get-user/get-user-dto';
import { IDeleteUserUseCase } from '../../../application/usecases/user/delete-user/idelete-user-usecase';
import { DeleteUserRequestParamsDTO } from '../../../application/usecases/user/delete-user/delete-user-dto';
import { IUpdateUserUseCase } from '../../../application/usecases/user/update-user/iupdate-user-usecase';
import {
  UpdateUserRequestBodyDTO,
  UpdateUserRequestParamsDTO,
} from '../../../application/usecases/user/update-user/update-user-dto';
import { CreateUserRequestBodyDTO } from '../../../application/usecases/user/create-user/create-user-dto';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';
import { IGetUsersStreamUseCase } from '../../../application/usecases/user/get-users-stream/iget-users-stream-usecase';
import { Response } from 'express';
import { GetUsersRequestQueryDTO } from '../../../application/usecases/user/get-users/get-users-dto';

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
    @Inject(IGetUsersStreamUseCase)
    private readonly getUsersStreamUseCase: IGetUsersStreamUseCase,
    @Inject(IDeleteUserUseCase)
    private readonly deleteUserUseCase: IDeleteUserUseCase,
    @Inject(IUpdateUserUseCase)
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserRequestBodyDTO) {
    return await this.createUserUseCase.execute(body);
  }

  @Get(':userId')
  async get(@Param() params: GetUserRequestParamsDTO) {
    return await this.getUserUseCase.execute(params);
  }

  @Get()
  async getAll(@Query() query: GetUsersRequestQueryDTO) {
    return await this.getUsersUseCase.execute({
      limit: query.limit,
      offset: query.page,
    });
  }

  @Get('data/stream')
  async getAllStream(@Res() res: Response) {
    const usersStream = await this.getUsersStreamUseCase.execute();

    res.set({
      'Content-Type': 'application/json',
    });

    usersStream.pipe(res);
  }

  @Delete(':userId')
  async delete(@Param() params: DeleteUserRequestParamsDTO) {
    return await this.deleteUserUseCase.execute(params);
  }

  @Put(':userId')
  async update(
    @Param() params: UpdateUserRequestParamsDTO,
    @Body() body: UpdateUserRequestBodyDTO,
  ) {
    return await this.updateUserUseCase.execute({
      userId: params.userId,
      ...body,
    });
  }
}
