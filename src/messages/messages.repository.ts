import { EntityRepository, Repository, getRepository } from 'typeorm';

import { messages } from './entity/messages.entity';
import { NewMsg } from './dto/NewMsg.dto';
import { AccountRepository } from '../account/account.repository';

@EntityRepository(messages)
export class MessageRepository extends Repository<messages> {
  getMessages = async (
    UserMail: string,
    userId: string,
    ReceiverMail: string,
    accounts: AccountRepository,
  ) => {
    try {
      const [resp, count] = await accounts.findAndCount({
        id: Number(ReceiverMail),
      });
      const [resp2, count2] = await accounts.findAndCount({
        email: UserMail,
      });
      const block = {
        BlockedMe: false,
        BlockedbyMe: false,
      };
      const Block1 = resp[0].blocklist;
      const Block2 = resp2[0].blocklist;

      if (Block1 !== null) {
        for (let i = 0; i < Block1.length; i++) {
          if (Number(Block1[i]) === Number(resp2[0].id)) {
            block.BlockedMe = true;
            break;
          }
        }
      }
      if (Block2 !== null) {
        for (let i = 0; i < Block2.length; i++) {
          if (Number(Block2[i]) === Number(resp[0].id)) {
            block.BlockedbyMe = true;
          }
        }
      }
      const Messages = await getRepository(messages)
        .createQueryBuilder('message')
        .where(
          'message.author = :id and message.receiver=:rec_id or message.author = :rec_id and message.receiver=:id ',
          { id: UserMail, rec_id: resp[0].email },
        )
        .getMany();
      if (Messages) {
        return {
          message: 'Messeage list fetched successfully',
          receiver: resp[0],
          Messages,
          block,
        };
      }
    } catch (err) {
      return 'Cannot fetch Message list';
      console.log(err);
    }
  };

  getChatlist = async (UserMail: string, accounts: AccountRepository) => {
    try {
      const Messages = await getRepository(messages)
        .createQueryBuilder('message')
        .where('message.author = :id or message.receiver=:id ', {
          id: UserMail,
        })
        .getMany();

      let Friends_Array = [];
      for (let i = 0; i < Messages.length; i++) {
        if (Messages[i].receiver === UserMail) {
          const [result, count] = await accounts.findAndCount({
            email: Messages[i].author,
          });
          Friends_Array = Friends_Array.concat(result);
        } else {
          const [result, count] = await accounts.findAndCount({
            email: Messages[i].receiver,
          });
          Friends_Array = Friends_Array.concat(result);
        }
      }

      let idArr = [];
      const Duplicate = input => {
        for (let i = 0; i < idArr.length; i++) {
          if (input === idArr[i]) return true;
        }
        idArr = idArr.concat(input);
        return false;
      };
      let DataArr = [];
      for (let i = 0; i < Friends_Array.length; i++) {
        if (false === Duplicate(Friends_Array[i].id)) {
          DataArr = DataArr.concat(Friends_Array[i]);
        }
      }

      if (DataArr) {
        return {
          message: 'Message list fetched successfully',
          result: DataArr,
        };
      }
    } catch (err) {
      return 'Cannot fetch Message list';
      console.log(err);
    }
  };

  newMsg = async (
    newMsg: NewMsg,
    email: string,
    accounts: AccountRepository,
  ) => {
    const { msg, photo, receiver } = newMsg;
    const message = new messages();
    let result;
    try {
      message.msg = msg;
      message.author = email;
      message.photo = photo;
      const [res, count] = await accounts.findAndCount({
        id: Number(receiver),
      });
      message.receiver = res[0].email;
      await message.save().then(res => {
        result = res;
      });
      return {
        status: 201,
        result: result,
        message: 'successfully created Message',
      };
    } catch (err) {
      console.log('cant create Message!!', err);
    }
  };
}
