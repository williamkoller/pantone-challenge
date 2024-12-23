import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ProducerDocumentType } from '../../../../domain/Producer';

export class UpdateProducerBodyDTO {
  @ApiProperty({ example: 'Producer Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty({ example: 'CPF' })
  @IsString()
  @IsOptional()
  documentType?: ProducerDocumentType;
}

export class UpdateProducerParamsDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsUUID('4')
  producerId: string;
}
