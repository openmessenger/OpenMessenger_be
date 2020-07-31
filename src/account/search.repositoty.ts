import { EntityRepository, Repository, getRepository } from 'typeorm';
import { messagers } from './entity/messager.entity';
import { SearchUser } from './dto/SearchUser.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(messagers)
export class AccountSearchRepository extends Repository<messagers> {
  SearchUser = async (UserEmail: string, getUsersDto: SearchUser) => {
    const { chat_to } = getUsersDto;
    try {
      const users = await getRepository(messagers)
        .createQueryBuilder('users')
        .where(' users.name ILIKE :search or users.email ILIKE :search', {
          search: '%' + chat_to + '%',
        })
        .getMany();
      let DataArr = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].email !== UserEmail) {
          DataArr = DataArr.concat(users[i]);
        }
      }
      if (DataArr.length > 0 && chat_to !== '' && chat_to !== ' ') {
        return {
          message: 'Users retrieved successfully!! ',
          searchresults: DataArr,
        };
      } else {
        return {
          statusCode: 400,
          error: 'No user are found....',
          searchresults: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: 400,
        error: 'Error in searching..',
      };
    }
  };
}
