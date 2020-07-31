import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetMsgs {
  @ApiModelProperty({ example: '7' })
  @IsString()
  receiver: string;
}
