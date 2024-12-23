import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from 'class-validator'

export class CreateFarmBodyDTO {
  @ApiProperty({ example: 'Fazenda do João' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MG' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  state: string
    
  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  arableArea: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;
}

export class CreateFarmParamsDTO {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsUUID('4')
  producerId: string;
}