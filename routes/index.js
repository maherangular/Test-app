var express = require('express');
var router = express.Router();
var Feedback = require('../models/feedback'); // require the feedback schema 
/* GET home page. */

// Router to post a feedback
router.post('/feedback', (req, res, next) => {

  let newfeedback = new Feedback (req.body); // create a feedback object with req.body 

  Feedback.addFeedback(newfeedback, (err, feedback) => { // add the feedback to the collections feedbacks
    if(err) {
      res.json({success: false});  // if error return succes false
    } else {
      res.json({success: true}); // if not error return succes true
    }
  });
});

router.get('/AllFeedback',(req, res, next) => { // router to get All feedbacks to verify the submition of the form.

  Feedback.find({}, (err,feedback)=> res.json(feedback));
}


);

module.exports = router;
