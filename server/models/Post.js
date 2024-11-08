const mongoose =require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,    
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assumes there is a User model
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
      },
      imageUrl: {
        type: String,
        required:false,
        default: '',
      },
      likes: {
        type: Number,
        default: 0,
      },
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          comment: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],

})


postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

  postSchema.methods.addLike = function () {
    this.likes += 1;
    return this.save();
  };
  


postSchema.methods.addComment = function (userId, commentText) {
    this.comments.push({ user: userId, comment: commentText });
    return this.save();
  };
  


module.exports = mongoose.model('Post', postSchema);
  
  