const express = require('express');
var router = express.Router();
const validator = require('validator');
var dbConfig = require('../dbConfig.js');

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(decodeURIComponent(payload.email))) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
    if(!validator.isEmail(decodeURIComponent(payload.email))){
      errors.email = 'Please provide valid email address.';
    }
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function verifyUser( payload, response ){
  var query = "select * from users where email='"+ decodeURIComponent(payload.email) + "' && password='"+payload.password+"'";
  dbConfig.connectToDB(query, function(err, rows){
       if(rows.length > 0){
         var data = rows.map((entry) => {
               const user = {
                 "name" : entry.username
               };
               return user;
             })
         response.status(200).json( {
           "success": true,
           "data":{
             "success": true,
             "user": data
           }
         });
       }else{
         response.status(200).json({
             "success": true,
             "data":{
               "success": false,
               "errors": {
                 "summary":"Please enter valid login credentials"
               }
             }
           })
       }
     });
}
router.post('/login', function(req, res) {
  console.log("in login");
    let payload = req.body;
    const validationResult = validateLoginForm(payload);
    if (!validationResult.success) {
      return res.status(200).json({
        success: true,
        data:{
          success: false,
          message: validationResult.message,
          errors: validationResult.errors
        }
      });
    }else{
        verifyUser(payload, res);
    }
});

module.exports = router;
