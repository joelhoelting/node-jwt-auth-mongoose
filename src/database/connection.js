import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Database connected.');
  } catch (error) {
    console.log('Database connectivity error', error);
    throw new Error(error);
  }
};

export default connectDB;
