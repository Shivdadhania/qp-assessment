import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginReqDto } from './dto';
import { UserRepository } from './../../repo';
import { comparePassword, generateJwt, messages } from '../../utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async checkUserExists(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(messages.userNotFound);
    }
    return user;
  }

  async login(body: LoginReqDto) {
    try {
      const user = await this.checkUserExists(body.email);
      const checkPassword = await comparePassword(
        body.password,
        user.password_hash,
      );
      if (!checkPassword) {
        throw new UnauthorizedException(messages.passwordWrong);
      }

      const token = generateJwt(user.email, user.role, user.id);
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
