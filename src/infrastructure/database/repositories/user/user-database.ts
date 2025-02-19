import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../models/user-model';
import { UserMapper } from '../../../../application/mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { User } from '../../../../domain/user/user';

@Injectable()
export class UserDatabase implements UserRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async create(user: User): Promise<User> {
    const userPersistence = await this.userModel.create(
      UserMapper.toPersistence(user),
    );
    return UserMapper.toDomain(userPersistence);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async update(user: User): Promise<User> {
    const userPersistence = await this.userModel.update(
      UserMapper.toPersistence(user),
      {
        where: { id: user.id.toString() },
        returning: true,
      },
    );

    return UserMapper.toDomain(userPersistence[1][0]);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }

  async findAll(): Promise<User[] | []> {
    const users = await this.userModel.findAll();
    if (!users) return [];
    return users.map(UserMapper.toDomain);
  }
}
