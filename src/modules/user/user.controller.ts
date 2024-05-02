import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginReqDto } from './dto';
import { messages } from '../../utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() payload: LoginReqDto) {
    const data = await this.userService.login(payload);
    return {
      data,
      message: messages.userLoginSuccessfully,
    };
  }
}
