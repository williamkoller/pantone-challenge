import { Association, Optional } from 'sequelize';
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
import { FarmModel } from './farm-model';
import { CropModel } from './crop-model';

export interface FarmCropAttributes {
  id: string;
  farmId: string;
  cropId: string;
  seasonYear: number;
  plantedArea: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface FarmCropCreationAttributes
  extends Optional<FarmCropAttributes, 'id'> {}

@Table({ tableName: 'farms_crops', timestamps: true, underscored: true })
export class FarmCropModel extends Model<
  FarmCropAttributes,
  FarmCropCreationAttributes
> {
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
  @ForeignKey(() => CropModel)
  @Column(DataType.UUID)
  cropId: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  seasonYear: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  plantedArea: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  static associations: {
    farm: Association<FarmCropModel, FarmModel>;
    crop: Association<FarmCropModel, CropModel>;
  };
}
