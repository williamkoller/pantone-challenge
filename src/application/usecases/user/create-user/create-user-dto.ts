import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../../../domain/user/user';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBodyDTO {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
