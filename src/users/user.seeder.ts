import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = {
      username: 'admin',
      avatar: '/no-avatar.png',
      email: 'admin@kinobox.com',
      password: await bcrypt.hash('secret', 12),
    };

    const testUser = {
      username: 'test-1',
      avatar: '/no-avatar.png',
      email: 'test-1@gmail.com',
      password: await bcrypt.hash('secret', 12),
    };

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([admin, testUser])
      .execute();
  }
}
