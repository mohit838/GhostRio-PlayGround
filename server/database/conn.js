import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import ENV from '../config.js';

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set('strictQuery', true);
  // const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log('Database Connected');
  return db;
}

export default connect;

// SOLUTIONS: https://github.com/nodkz/mongodb-memory-server/issues/480
// IF MongoMemoryServer Not Running in "Ubuntu" Then Paste it terminal and install
/**
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
*/
