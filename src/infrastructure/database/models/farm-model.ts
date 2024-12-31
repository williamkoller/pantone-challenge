import { Association, Optional } from 'sequelize';
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
import { ProducerAttributes, ProducerModel } from './producer-model';
import { CropModel } from './crop-model';
import { FarmCropModel } from './farm-crop-model';

export interface FarmAttributes {
  id: string;
  producerId: string;
  producer?: ProducerAttributes | null;
  name: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  landUse: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface FarmCreationAttributes extends Optional<FarmAttributes, 'id'> {}

@Table({ tableName: 'farms', timestamps: true, underscored: true })
export class FarmModel extends Model<FarmAttributes, FarmCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => ProducerModel)
  @Column(DataType.UUID)
  producerId: string;

  @BelongsTo(() => ProducerModel)
  producer: ProducerModel;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.DECIMAL(10, 2))
  totalArea: number;

  @Column(DataType.DECIMAL(10, 2))
  arableArea: number;

  @Column(DataType.DECIMAL(10, 2))
  vegetationArea: number;

  @HasMany(() => FarmCropModel)
  farmCrops: FarmCropModel[];

  @BelongsToMany(() => CropModel, () => FarmCropModel)
  crops: CropModel[];

  @Column(DataType.STRING)
  landUse: string;

  static associations: {
    producer: Association<FarmModel, ProducerModel>;
  };
}
