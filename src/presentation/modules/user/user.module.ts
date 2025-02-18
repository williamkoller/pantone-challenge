import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../../infrastructure/database/models/user-model';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user/create-user-usecase';
import { UserRepository } from '../../../domain/repositories/user/user-repository';
import { UserDatabase } from '../../../infrastructure/database/repositories/user/user-database';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { GetUserUseCase } from '../../../application/usecases/user/get-user/get-user-usecase';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';
import { GetUsersUseCase } from '../../../application/usecases/user/get-users/get-users-usecase';
import { UserController } from '../../controllers/user/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: UserRepository,
      useClass: UserDatabase,
    },
    {
      provide: IGetUserUseCase,
      useClass: GetUserUseCase,
    },
    {
      provide: IGetUsersUseCase,
      useClass: GetUsersUseCase,
    },
  ],
})
export class UserModule {}
