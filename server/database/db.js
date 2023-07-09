import mongoose from 'mongoose';

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected Successfully!!');
    return db;
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
}

export default connect;
