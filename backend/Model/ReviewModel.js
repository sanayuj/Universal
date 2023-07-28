const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    course:{
        type:ObjectId,
        ref: 'movie'
    },
    createAt: {
        type: Date,
        default: Date.now,
      },

    review:String,
    
});

module.exports = new mongoose.model('review',reviewSchema);