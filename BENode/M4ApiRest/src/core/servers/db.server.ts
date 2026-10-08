import mongoose from 'mongoose';

const connect = async (connectionURL: string) => {
  await mongoose.connect(connectionURL);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

interface DBServer {
  connect: (connectionURL: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

export let dbServer: DBServer = {
  connect,
  disconnect,
};
