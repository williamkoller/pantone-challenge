import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../../infrastructure/database/models/user-model';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user/create-user-usecase';
import { UserDatabase } from '../../../infrastructure/database/repositories/user/user-database';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { GetUserUseCase } from '../../../application/usecases/user/get-user/get-user-usecase';
import { UserController } from '../../controllers/user/user.controller';
import { IDeleteUserUseCase } from '../../../application/usecases/user/delete-user/idelete-user-usecase';
import { DeleteUserUseCase } from '../../../application/usecases/user/delete-user/delete-user-usecase';
import { IUpdateUserUseCase } from '../../../application/usecases/user/update-user/iupdate-user-usecase';
import { UpdateUserUseCase } from '../../../application/usecases/user/update-user/update-user-usecase';
import { UserRepository } from '../../../data/db/user/user-repository';
import { Hasher } from '../../../data/protocols/cryptography/hasher';
import { BcryptAdapter } from '../../../infrastructure/criptography/bcrypt/bcrypt-adapter';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';
import { GetUsersUseCase } from '../../../application/usecases/user/get-users/get-users-usecase';
import { IGetUsersStreamUseCase } from '../../../application/usecases/user/get-users-stream/iget-users-stream-usecase';
import { GetUsersStreamUseCase } from '../../../application/usecases/user/get-users-stream/get-users-stream-usecase';

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
    {
      provide: IGetUsersStreamUseCase,
      useClass: GetUsersStreamUseCase,
    },
    {
      provide: IDeleteUserUseCase,
      useClass: DeleteUserUseCase,
    },
    {
      provide: IUpdateUserUseCase,
      useClass: UpdateUserUseCase,
    },
    {
      provide: Hasher,
      useClass: BcryptAdapter,
    },
  ],
})
export class UserModule {}
