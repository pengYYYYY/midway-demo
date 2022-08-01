import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
