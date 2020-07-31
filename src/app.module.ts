import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './config/db.config';
import { DefaultAdminModule } from 'nestjs-admin';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { MessageController } from './messages/messages.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot(DbConfig),
    AccountModule,
    DefaultAdminModule,
    MessagesModule,
    ChatModule,
  ],
  controllers: [AccountController, MessageController],
  providers: [],
})
export class AppModule {}
