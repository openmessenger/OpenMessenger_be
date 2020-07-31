import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth-guard';
import { NewMsg } from './dto/NewMsg.dto';
import { GetMsgs } from './dto/GetMsgs.dto';
import { ValidationPipe } from '../common/validation.pipe';
import { MessageService } from './messages.service';

@Controller('api/v1/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('new')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(@Req() req, @Body() Messagebody: NewMsg): Promise<any> {
    return this.messageService.create(req, Messagebody);
  }

  @Post('all')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async getmsgs(@Req() req, @Body() Messagebody: GetMsgs): Promise<any> {
    return this.messageService.getAllMessages(req, Messagebody);
  }

  @Get('allchats')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async getchats(@Req() req): Promise<any> {
    return this.messageService.geAllChats(req);
  }
}
