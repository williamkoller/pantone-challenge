import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteUserRequestParamsDTO {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}