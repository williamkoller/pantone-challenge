import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCropBodyDTO {
  @ApiProperty({ example: 'farm-id' })
  @IsNotEmpty()
  @IsUUID('4')
  farmId: string;

  @ApiProperty({ example: 2022 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'cropType' })
  @IsNotEmpty()
  @IsString()
  cropType: string;
}
