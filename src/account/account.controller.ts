import {
  Controller,
  Logger,
  UseGuards,
  Get,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/shared/auth-guard';
import { LoginDto } from './dto';
import { SearchUser } from './dto/SearchUser.dto';

@ApiUseTags('Account Management')
@Controller('api/v1/account')
export class AccountController {
  private logger = new Logger('Account Controller');
  constructor(private readonly accountService: AccountService) {}

  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @Get('user')
  getUser(@Req() req) {
    this.logger.verbose(`User Retrieved `);
    return this.accountService.getUser(req);
  }

  @ApiBearerAuth()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    this.logger.verbose('userLogged in ');
    return this.accountService.login(loginDto);
  }

  @Post('search')
  @UseGuards(new AuthGuard())
  async getuser(@Req() req, @Body() UserSearch: SearchUser): Promise<any> {
    return this.accountService.SearchUser(req, UserSearch);
  }
}
