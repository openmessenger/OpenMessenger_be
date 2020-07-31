import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountSearchRepository } from './search.repositoty';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';
import { NewUser } from './dto/NewUser.dto';
import { SearchUser } from './dto/SearchUser.dto';

@Injectable()
export class AccountService {
  private logger = new Logger('Account Service');
  constructor(
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly accountsearchRepo: AccountSearchRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(data: NewUser): Promise<any> {
    const checkaccount = await this.accountRepository.findOne({
      email: data.email,
    });
    if (checkaccount) {
      Logger.log('OLD');
      return checkaccount;
    } else {
      Logger.log('NEW');
      return this.accountRepository.AddNewMessager(data);
    }
  }
  async getUser(req: any): Promise<any> {
    const User = this.validateAccount(req.user);

    if (req.user.type === 'messager') {
      const usernew = {
        name: req.user.name,
        email: req.user.email,
        photo: req.user.photo,
      };
      this.logger.verbose(`Faculty Logged In ${usernew.name}`);
      const { ...result } = usernew;
      let finalresult = { ...result, type: 'messager' };
      return {
        success: true,
        message: 'Success',
        data: finalresult,
      };
    }
  }

  async login(data: LoginDto): Promise<any> {
    const { email, photo, name } = data;
    const payload = { email, name, photo, type: 'messager' };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
    };
  }

  async SearchUser(req: any, data: SearchUser): Promise<any> {
    const email = req.user.email;
    return this.accountsearchRepo.SearchUser(email, data);
  }
}
