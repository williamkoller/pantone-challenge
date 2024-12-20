import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from '../../../shared/decorators/IsCPFOrCNPJConstraint';
import { ProducerDocumentType } from '../../../domain/Producer';

export class CreateProducerDTO {
  @ApiProperty({ example: 'Agro São Pedro' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsNotEmpty()
  @IsString()
  @IsCPFOrCNPJ()
  document: string;

  @ApiProperty({
    enum: ProducerDocumentType,
    example: ProducerDocumentType.CPF,
  })
  @IsNotEmpty()
  @IsEnum(ProducerDocumentType)
  type: ProducerDocumentType;
}
