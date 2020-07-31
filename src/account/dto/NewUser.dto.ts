import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewUser {
  @ApiModelProperty({ example: 'abc@efg.com' })
  @IsString()
  email: string;

  @ApiModelProperty({ example: 'Jishnu P S' })
  @IsString()
  name: string;

  @ApiModelProperty({ example: 'img3.photowebsite.com' })
  @IsString()
  photo: string;
}
