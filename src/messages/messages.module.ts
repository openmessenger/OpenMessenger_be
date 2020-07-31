import { Module } from '@nestjs/common';
import { MessageController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { messages } from './entity/messages.entity';
import { MessageService } from './messages.service';
import { MessageRepository } from './messages.repository';
import { AccountRepository } from '../account/account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([messages, MessageRepository, AccountRepository]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export class MessagesModule {}
