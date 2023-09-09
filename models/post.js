const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: new Date() },
  published: { type: Boolean, required: true, default: false },
});

PostSchema.virtual('url').get(function () {
  return `/post/${this._id}`;
});

exports.module = mongoose.model('Post', PostSchema);
