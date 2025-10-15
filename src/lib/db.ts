import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

// Inicializa el caché global si no existe
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // ✅ Valida DENTRO de la función
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  const { conn, promise } = global.mongoose;

  if (conn) {
    return conn;
  }

  if (!promise) {
    global.mongoose.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }
}