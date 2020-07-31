import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { AccountRepository } from './account.repository';
import { AccountSearchRepository } from './search.repositoty';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { accountAshaWorker } from './account.ashaworker';
const jwtConfig = config.get('jwt');
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      AccountRepository,
      AccountSearchRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
    DefaultAdminModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('AshaWorker', accountAshaWorker);
  }
}
