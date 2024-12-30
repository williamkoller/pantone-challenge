import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { FarmModel } from './FarmModel';

export interface CropAttributes {
  id: string;
  farmId: string;
  cropType: string;
  year: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
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
  @ForeignKey(() => FarmModel)
  @Column(DataType.UUID)
  farmId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  cropType: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  year: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
