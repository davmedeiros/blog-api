const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  name: { type: String },
  surname: { type: String },
});

UserSchema.virtual('url').get(function () {
  return `/user/${this.username}`;
});

UserSchema.virtual('full_name').get(function () {
  return `${this.name} ${this.surname}`;
});

module.exports = mongoose.model('User', UserSchema);
