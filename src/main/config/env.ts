export default {
  MONGO_URI:
    process.env.MONGO_URI || 'mongodb://localhost:27017/clean-node-api-db',
  PORT: process.env.PORT || 3000
}
