import { Association, Optional } from 'sequelize';
import { ProducerDocumentType } from '@app/domain/producer/producer';
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
import { FarmAttributes, FarmModel } from './farm-model';

export interface ProducerAttributes {
  id: string;
  name: string;
  document: string;
  documentType: ProducerDocumentType;
  farms?: FarmAttributes[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface ProducerCreationAttributes
  extends Optional<ProducerAttributes, 'id'> {}

@Table({ tableName: 'producers', timestamps: true, underscored: true })
export class ProducerModel extends Model<
  ProducerAttributes,
  ProducerCreationAttributes
> {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  document: string;

  @AllowNull(false)
  @Column(DataType.ENUM(ProducerDocumentType.CPF, ProducerDocumentType.CNPJ))
  documentType: ProducerDocumentType;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @HasMany(() => FarmModel)
  farms: FarmModel[];

  static associations: {
    farms: Association<ProducerModel, FarmModel>;
  };
}
