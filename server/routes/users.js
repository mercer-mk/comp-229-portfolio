/*routes/user.js
 Milankumar Chhaganbhai Khunt
301245415
26/02/2023
*/

var express = require("express");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
