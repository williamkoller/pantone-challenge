import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from '@app/shared/decorators/is-cpf-or-cnpj-constraint';
import { ProducerDocumentType } from '@app/domain/producer/producer';

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
