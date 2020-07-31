import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewMsg {
  @ApiModelProperty({ example: 'Hai hello' })
  @IsString()
  msg: string;

  @ApiModelProperty({ example: '9' })
  @IsString()
  receiver: string;
}
