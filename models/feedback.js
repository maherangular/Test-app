const mongoose = require('mongoose');

// Feedback Schema
const FeedbackSchema = mongoose.Schema ({
  firstname: {
    type: String
  },
  lastname: {
    type: String,
   
  },
  tel: {
    type: Number,
   
  },
  Feedback: {
    type: String,
   
  }
  ,
  email: {
	  type:String ,
  } ,
  rating: {
	  type: Number ,
  }
  
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

module.exports.addFeedback = function(newFeedback, callback) {
 
  newFeedback.save(callback);
  }

