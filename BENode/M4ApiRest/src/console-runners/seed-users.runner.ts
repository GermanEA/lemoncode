import { hash } from '#common/helpers/index.js';
import { userContext } from '#dals/user/user.context.js';
import { db } from '#dals/mock-data.js';

export const run = async () => {
  for (const user of db.users) {
    const hashedPassword = await hash(user.password);

    await userContext.create({
      ...user,
      password: hashedPassword,
    });
  }
};
