import { Injectable } from '@nestjs/common';
import { NewMsg } from './dto/NewMsg.dto';
import { GetMsgs } from './dto/GetMsgs.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './messages.repository';
import { AccountRepository } from '../account/account.repository';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
    private readonly account: AccountRepository,
  ) {}

  async create(req: any, data: NewMsg) {
    const email = req.user.email;
    return this.messageRepository.newMsg(data, email, this.account);
  }

  async getAllMessages(req: any, data: GetMsgs): Promise<any> {
    const senderMail = data.receiver;
    return this.messageRepository.getMessages(
      req.user.email,
      senderMail,
      this.account,
    );
  }

  async geAllChats(req: any): Promise<any> {
    return this.messageRepository.getChatlist(req.user.email, this.account);
  }
}
