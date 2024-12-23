import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from '../../../../shared/decorators/IsCPFOrCNPJConstraint';
import { ProducerDocumentType } from '../../../../domain/producer/Producer';

export class CreateProducerBodyDTO {
  @ApiProperty({ example: 'Agro São Pedro' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Document number which can be a CPF or CNPJ',
    examples: {
      CPF: '123.456.789-00',
      CNPJ: '12.345.678/0001-99',
    },
  })
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
  documentType: ProducerDocumentType;
}
