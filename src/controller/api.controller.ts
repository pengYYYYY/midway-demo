import { Inject, Controller, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/user/login')
  @Validate()
  async login(@Body() user: UserDTO) {
    try {
      const { username, password } = user;

      const token = await this.userService.getUserByUsernameAndPassword(
        username,
        password
      );
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token,
        },
      };
    } catch (msg) {
      return {
        code: 400,
        result: 'error',
        message: msg,
        data: null,
      };
    }
  }

  @Get('/user/create')
  async getUser() {
    const user = await this.userService.createUser();
    return { success: true, message: 'OK', data: user };
  }
}
