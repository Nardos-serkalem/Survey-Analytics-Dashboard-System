import * as mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;
declare  global{
    var mongooseCache: {
        conn: typeof mongoose | null,
        promise: Promise<typeof mongoose> | null
    }
}
//lets check if we have a cached connection, that way we can reuse it instead of creating a new one every time page is loaded.
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}
export const connectToDatabase = async () => {
   if(!MONGO_URI) throw new Error("MongoDB URI is missing");
   if(cached.conn) return cached.conn;
   if (!cached.promise) {
       cached.promise = mongoose.connect(MONGO_URI,{bufferCommands:false});
   }

   try {
         cached.conn = await cached.promise;

   }catch(err) {
       cached.promise = null;
         throw err;
   }
    console.log(`Connected to MongoDB at ${process.env.NODE_ENV}`);
    return cached.conn;
}