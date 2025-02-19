import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../../../domain/user/user';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateUserRequestBodyDTO {
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@mail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

export class UpdateUserRequestParamsDTO {
  @ApiProperty({ example: 'user-id' })
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;
}
