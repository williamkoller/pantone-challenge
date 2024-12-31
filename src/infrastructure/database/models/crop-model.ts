import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { FarmAttributes, FarmModel } from './farm-model';
import { FarmCropModel } from './farm-crop-model';

export interface CropAttributes {
  id: string;
  farmId: string;
  farm?: FarmAttributes;
  cropType: string;
  year: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface CropCreationAttributes extends Optional<CropAttributes, 'id'> {}

@Table({ tableName: 'crops', timestamps: true, underscored: true })
export class CropModel extends Model<CropAttributes, CropCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => FarmModel)
  @Column(DataType.UUID)
  farmId: string;

  @Column(DataType.STRING)
  cropType: string;

  @Column(DataType.INTEGER)
  year: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @BelongsTo(() => FarmModel)
  farm: FarmModel;

  @HasMany(() => FarmCropModel)
  farmCrops: FarmCropModel[];

  @BelongsToMany(() => FarmModel, () => FarmCropModel)
  farms: FarmModel[];
}
