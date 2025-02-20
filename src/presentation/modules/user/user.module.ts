import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user/create-user-usecase';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { DeleteUserUseCase } from '../../../application/usecases/user/delete-user/delete-user-usecase';
import { IDeleteUserUseCase } from '../../../application/usecases/user/delete-user/idelete-user-usecase';
import { GetUserUseCase } from '../../../application/usecases/user/get-user/get-user-usecase';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { GetUsersUseCase } from '../../../application/usecases/user/get-users/get-users-usecase';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';
import { IUpdateUserUseCase } from '../../../application/usecases/user/update-user/iupdate-user-usecase';
import { UpdateUserUseCase } from '../../../application/usecases/user/update-user/update-user-usecase';
import { UserRepository } from '../../../data/db/user/user-repository';
import { Hasher } from '../../../data/protocols/cryptography/hasher';
import { BcryptAdapter } from '../../../infrastructure/criptography/bcrypt/bcrypt-adapter';
import { UserModel } from '../../../infrastructure/database/models/user-model';
import { UserDatabase } from '../../../infrastructure/database/repositories/user/user-database';
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
