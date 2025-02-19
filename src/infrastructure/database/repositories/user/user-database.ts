import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../models/user-model';
import { UserMapper } from '../../../../application/mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { User } from '../../../../domain/user/user';
import { Readable } from 'stream';
import { UniqueEntityId } from '../../../../shared/domain/unique-entity-id/unique-entity-id';

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

  async findAll(limit: number, offset: number): Promise<{ users: User[]; total: number}> {
    const { rows, count } = await this.userModel.findAndCountAll({
      limit,
      offset,
    });
    
    const users = rows.map(UserMapper.toDomain)

    return {
      users,
      total: count
    }
  }

  async findAllStream(): Promise<Readable> {
    const stream = new Readable({
      objectMode: true,
      read() {},
    });

    let offset = 0;
    const limit = 100;
    const usersArray: User[] = [];

    const fetchNextPage = async () => {
      try {
        const users = await this.userModel.findAll({
          limit,
          offset,
        });

        if (users.length === 0) {
          stream.push(usersArray);
          stream.push(null);
          return;
        }

        users.forEach((user) => {
          const userDomain = UserMapper.toDomain(user);
          usersArray.push(UserMapper.toDTO(userDomain) as unknown as any);
        });

        offset += limit;
        fetchNextPage();
      } catch (error) {
        stream.emit('error', error);
      }
    };

    fetchNextPage();

    return stream;
  }
}
