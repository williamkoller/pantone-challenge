import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateFarmBodyDTO {
  @ApiProperty({ example: 'Fazenda do João' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MG' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    example: 1000000,
    description: 'Area in square meters // 1000000 m² = 100 hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  arableArea: number;

  @ApiProperty({
    example: 700000,
    description: 'Area in square meters // 700000 m² = 70 hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({
    example: 2000000,
    description: 'Area in square meters // 2000000 m² = 200 hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  totalArea: number;
}

export class CreateFarmParamsDTO {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsUUID('4')
  producerId: string;
}
