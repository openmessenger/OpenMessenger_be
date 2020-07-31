import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiModelProperty({ example: null })
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  photo: string;
}
