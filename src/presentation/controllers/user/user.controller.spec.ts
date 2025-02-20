import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ICreateUserUseCase } from '../../../application/usecases/user/create-user/icreate-user-usecase';
import { IGetUserUseCase } from '../../../application/usecases/user/get-user/iget-user-usecase';
import { IGetUsersUseCase } from '../../../application/usecases/user/get-users/iget-users-usecase';
import { IGetUsersStreamUseCase } from '../../../application/usecases/user/get-users-stream/iget-users-stream-usecase';
import { IDeleteUserUseCase } from '../../../application/usecases/user/delete-user/idelete-user-usecase';
import { IUpdateUserUseCase } from '../../../application/usecases/user/update-user/iupdate-user-usecase';
import { Response } from 'express';
import * as zlib from 'zlib';
import { UserRoleEnum } from '../../../domain/user/user';

describe('UserController', () => {
  let userController: UserController;
  let createUserUseCase: ICreateUserUseCase;
  let getUserUseCase: IGetUserUseCase;
  let getUsersUseCase: IGetUsersUseCase;
  let getUsersStreamUseCase: IGetUsersStreamUseCase;
  let deleteUserUseCase: IDeleteUserUseCase;
  let updateUserUseCase: IUpdateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: ICreateUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IGetUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IGetUsersUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IGetUsersStreamUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IDeleteUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IUpdateUserUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    createUserUseCase = module.get<ICreateUserUseCase>(ICreateUserUseCase);
    getUserUseCase = module.get<IGetUserUseCase>(IGetUserUseCase);
    getUsersUseCase = module.get<IGetUsersUseCase>(IGetUsersUseCase);
    getUsersStreamUseCase = module.get<IGetUsersStreamUseCase>(
      IGetUsersStreamUseCase,
    );
    deleteUserUseCase = module.get<IDeleteUserUseCase>(IDeleteUserUseCase);
    updateUserUseCase = module.get<IUpdateUserUseCase>(IUpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should call createUserUseCase.execute with correct data', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: UserRoleEnum.ADMIN,
      };
      (createUserUseCase.execute as jest.Mock).mockResolvedValue({
        id: '1',
        ...dto,
      });

      const result = await userController.create(dto);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('get', () => {
    it('should call getUserUseCase.execute with correct ID', async () => {
      const userId = '1';
      const expectedUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };
      (getUserUseCase.execute as jest.Mock).mockResolvedValue(expectedUser);

      const result = await userController.get({ userId });

      expect(getUserUseCase.execute).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('getAll', () => {
    it('should call getUsersUseCase.execute with correct query params', async () => {
      const query = { limit: 0, page: 0 };
      const expectedUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
      ];
      (getUsersUseCase.execute as jest.Mock).mockResolvedValue(expectedUsers);

      const result = await userController.getAll(query);

      expect(getUsersUseCase.execute).toHaveBeenCalledWith({
        limit: 0,
        offset: 0,
      });
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('update', () => {
    it('should call updateUserUseCase.execute with correct data', async () => {
      const params = { userId: '1' };
      const dto = { name: 'Updated Name' };
      const expectedUser = {
        id: '1',
        name: 'Updated Name',
        email: 'john@example.com',
      };

      (updateUserUseCase.execute as jest.Mock).mockResolvedValue(expectedUser);

      const result = await userController.update(params, dto);

      expect(updateUserUseCase.execute).toHaveBeenCalledWith({
        userId: '1',
        ...dto,
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('delete', () => {
    it('should call deleteUserUseCase.execute with correct ID', async () => {
      const params = { userId: '1' };
      (deleteUserUseCase.execute as jest.Mock).mockResolvedValue({
        message: 'User deleted',
      });

      const result = await userController.delete(params);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(params);
      expect(result).toEqual({ message: 'User deleted' });
    });
  });
});
