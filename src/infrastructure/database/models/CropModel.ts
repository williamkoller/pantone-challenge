import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export interface CropAttributes {
  id: string;
  name: string;
}

interface CropCreationAttributes extends Optional<CropAttributes, 'id'> {}

@Table({ tableName: 'crops', timestamps: true, underscored: true })
export class CropModel extends Model<CropAttributes, CropCreationAttributes> {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
