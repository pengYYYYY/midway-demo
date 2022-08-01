import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  it('should POST /api/user/login success', async () => {
    // create app
    const app = await createApp<Framework>();

    // 正确
    const result = await createHttpRequest(app).post('/api/user/login').type('json').send({ username: 'jack', password: 'redballoon' })

    expect(result.body.code).toBe(200);
    expect(result.body.message).toBe('登录成功');
    expect(result.body.result).toBe('success');

    // 密码失败
    const resultError = await createHttpRequest(app).post('/api/user/login').type('json').send({ username: 'jack', password: 'test' })
    expect(resultError.body.code).toBe(400);
    expect(resultError.body.message).toBe('账号或密码不正确');
    expect(resultError.body.result).toBe('error');

     // 密码失败
    const resultValidate = await createHttpRequest(app).post('/api/user/login').type('json').send({ username: 'jack' })
    expect(resultValidate.status).toBe(422);

    // close app
    await close(app);
  });
});
