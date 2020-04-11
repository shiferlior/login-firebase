var express = require('express');
// const fireAdmin = require('firebase-admin');
// var app = fireAdmin.initializeApp();
var router = express.Router();

/* GET users listing. */
router.get('/:idToken', function(req, res, next) {
  // console.log(req.params.idToken);
  // try{
  // app.auth().verifyIdToken(req.params.idToken)
  //   .then((decodedToken) => {
  //     let uid = decodedToken.uid;
  //     console.log(111);
  //     res.send(uid);
  //   })
  //   .catch((error) => {
  //     console.log(222 + error);
  //     res.send({
  //       "user": "not connected"
  //     });
  //   });
  // }
  // catch(error) {
  //   console.log(error);
  // }
  res.send(req.params.idToken);
});

module.exports = router;
