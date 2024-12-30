import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateFarmCropBodyDTO {
  @ApiProperty({ example: 'farmId' })
  @IsNotEmpty()
  @IsUUID('4')
  farmId: string;

  @ApiProperty({ example: 'cropId' })
  @IsNotEmpty()
  @IsUUID('4')
  cropId: string;

  @ApiProperty({ example: 2021 })
  @IsNotEmpty()
  @IsNumber()
  seasonYear: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  plantedArea: number;
}
