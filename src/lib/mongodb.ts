import mongoose from 'mongoose';

const MONGODB_URI= "mongodb+srv://petertranhoanglinh:nZVmUgEZiK7QJixA@cluster0.hpkt7ug.mongodb.net/binnance?retryWrites=true&w=majority&ssl=true"

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
    .then((mongoose) => {
      console.log('✅ MongoDB connected!');
      return mongoose;
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      throw error; 
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
