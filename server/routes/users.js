/*routes/user.js
 Milankumar Chhaganbhai Khunt
301245415
02/10/2022
*/

var express = require("express");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
