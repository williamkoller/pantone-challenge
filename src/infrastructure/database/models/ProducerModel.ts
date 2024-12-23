import { Optional } from 'sequelize';
import { ProducerDocumentType } from '../../../domain/Producer';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export interface ProducerAttributes {
  id: string;
  name: string;
  document: string;
  documentType: ProducerDocumentType;
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
}
