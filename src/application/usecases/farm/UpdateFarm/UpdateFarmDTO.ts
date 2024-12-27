import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class UpdateFarmBodyDTO {
  @ApiProperty({ example: '1' })
  @IsOptional()
  @IsUUID('4')
  producerId: string;

  @ApiProperty({ example: 'Fazenda do João' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MG' })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  arableArea: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  totalArea: number;
}

export class UpdateFarmParamsDTO {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsUUID('4')
  farmId: string;
}
