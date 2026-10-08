import { MongoMemoryServer } from 'mongodb-memory-server';

export async function setup() {
  const dbServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'test-airbnb',
    },
  });

  process.env.MONGODB_URL = dbServer.getUri();

  return async () => {
    await dbServer.stop();
  };
}
