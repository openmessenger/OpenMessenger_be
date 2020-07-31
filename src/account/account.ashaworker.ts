import { AdminEntity } from 'nestjs-admin';
import { Account } from './entity/account.entity';

export class accountAshaWorker extends AdminEntity {
  entity = Account;
  fields = ['ashaWorkerId', 'name', 'email', 'status'];
  listDisplay = ['ashaWorkerId', 'name', 'email'];
  searchFields = ['ashaWorkerId', 'name'];
}
