import mongoose from 'mongoose';

export async function connect(): Promise<boolean> {
  try {
    await mongoose.connect('mongodb://localhost/blogs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
