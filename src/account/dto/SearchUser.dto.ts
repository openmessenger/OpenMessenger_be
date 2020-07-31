import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchUser {
  @ApiModelProperty({ example: '9' })
  @IsString()
  chat_to: string;
}
