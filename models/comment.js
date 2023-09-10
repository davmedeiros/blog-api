const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
});

CommentSchema.virtual('url').get(function () {
  return `/comment/${this._id}`;
});

exports.module = mongoose.model('Comment', CommentSchema);
