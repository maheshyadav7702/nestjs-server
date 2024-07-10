export default () => ({
  jwt: {
    secret: process.env.JWT_SECTER || '123',
  },

  database: {
    uri: process.env.DB_URI ||
      'mongodb+srv://mahesh7702017554:WbpRL2rQuyeLK2GB@maheshdev.som5s41.mongodb.net/?retryWrites=true&w=majority&appName=maheshDev',
  },
});
