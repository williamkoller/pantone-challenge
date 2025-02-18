import { Association, Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserRoleEnum } from '../../../domain/user/user';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @Column(DataType.ENUM(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT))
  role: UserRoleEnum;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
