import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
    // index: {
    //   type: 'text',
    // },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

postSchema.index({
  title: 'text',
  content: 'text',
});

const PostModel = model('Post', postSchema);

export default PostModel;
