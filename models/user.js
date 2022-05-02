const mongoose = require('mongoose');

const userSchema = {
  name: {
    type: String,
    required: [true, '請輸入您的名稱'],
  },
  email: {
    type: String,
    required: [true, '請輸入您的Email'],
    unique: true,
    lowercase: true,
    select: false,
  },
  photo: String,
}

const User_Schema = new mongoose.Schema(
  userSchema,
  {
    versionKey: false,
  }
)

const User = mongoose.model('User', User_Schema);

module.exports = User;