import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserRequestParamsDTO {
  @ApiProperty({ example: 'user-id' })
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;
}
