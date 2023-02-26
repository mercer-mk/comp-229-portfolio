/*routes/index.js
 Milankumar Chhaganbhai Khunt
301245415
26/02/2023
*/
var express = require("express");
var router = express.Router();
let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET About Us page. */
router.get("/about", indexController.displayAboutPage);

/* GET Products page. */
router.get("/projects", indexController.displayProjectsPage);

/* GET Services page. */
router.get("/services", indexController.displayServicesPage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactPage);

router.get("/login", indexController.displayLoginPage);

router.post("/login", indexController.processLoginPage);

/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);
module.exports = router;
