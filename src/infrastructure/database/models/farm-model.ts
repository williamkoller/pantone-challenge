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
import { ProducerAttributes, ProducerModel } from './producer-model';

export interface FarmAttributes {
  id: string;
  producerId: string;
  producer?: ProducerAttributes | null;
  name: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface FarmCreationAttributes extends Optional<FarmAttributes, 'id'> {}

@Table({ tableName: 'farms', timestamps: true, underscored: true })
export class FarmModel extends Model<FarmAttributes, FarmCreationAttributes> {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @ForeignKey(() => ProducerModel)
  @Column(DataType.UUID)
  producerId: string;

  @BelongsTo(() => ProducerModel)
  producer: ProducerModel;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  state: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  totalArea: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  arableArea: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  vegetationArea: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  static associations: {
    producer: Association<FarmModel, ProducerModel>;
  };
}
