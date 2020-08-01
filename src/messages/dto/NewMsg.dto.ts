import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class NewMsg {
  @ApiModelProperty({ example: 'Hai hello' })
  @IsString()
  msg: string;

  @ApiModelProperty({ example: 'https:/xxx.xx.xxx' })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiModelProperty({ example: '9' })
  @IsString()
  receiver: string;
}
