module.exports = {
  server: {
    port: process.env.PORT || 8082,
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb+srv://tanyasawarn222:ssDo1eI2SGXCR2zv@cluster0.usxxhcv.mongodb.net/?retryWrites=true&w=majority",
  },
};
