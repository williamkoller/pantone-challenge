import { Association, Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { FarmAttributes, FarmModel } from './farm-model';
import { CropAttributes, CropModel } from './crop-model';

export interface FarmCropAttributes {
  id: string;
  farmId: string;
  farm?: FarmAttributes;
  cropId: string;
  crop?: CropAttributes;
  seasonYear: number;
  plantedArea: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface FarmCropCreationAttributes
  extends Optional<FarmCropAttributes, 'id'> {}

@Table({ tableName: 'farm_crops', timestamps: true, underscored: true })
export class FarmCropModel extends Model<
  FarmCropAttributes,
  FarmCropCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => FarmModel)
  @Column(DataType.UUID)
  farmId: string;

  @ForeignKey(() => CropModel)
  @Column(DataType.UUID)
  cropId: string;

  @BelongsTo(() => FarmModel)
  farm: FarmModel;

  @BelongsTo(() => CropModel)
  crop: CropModel;

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
