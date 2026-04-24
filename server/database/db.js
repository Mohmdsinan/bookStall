const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB with mongoose'))
  .catch(err => console.log('MongoDB connection error:', err))