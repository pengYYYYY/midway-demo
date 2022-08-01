import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  UserModel: Repository<UserEntity>;

  @Inject()
  jwtService: JwtService;

  async createUser() {
    const newUser = new UserEntity();
    newUser.username = 'jack';
    newUser.password = 'redballoon';
    const res = await this.UserModel.save(newUser);
    return res;
  }

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password) {
    const curUser = await this.UserModel.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (curUser) {
      const jwt = await this.jwtService.sign({ ...curUser });
      return jwt;
    } else {
      throw '账号或密码不正确';
    }
  }
}
