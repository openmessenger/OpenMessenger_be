import { EntityRepository, Repository } from 'typeorm';
import { messagers } from './entity/messager.entity';
import { NewUser } from './dto/NewUser.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(messagers)
export class AccountRepository extends Repository<messagers> {
  AddNewMessager = async (newUser: NewUser) => {
    const { email, name, photo } = newUser;
    const Users = new messagers();
    let result;
    try {
      Users.email = email;
      Users.photo = photo;
      Users.name = name;
      await Users.save().then(res => {
        result = res;
      });
      return {
        status: 201,
        result: result,
        message: 'User created',
      };
    } catch (err) {
      console.log('cant create user', err);
    }
  };
}
