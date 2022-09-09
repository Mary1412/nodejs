const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const {getSchs, getSch, postSch, deleteSch, putSch } = require('../controllers/control.js')




router.get("/api/school", getSchs);
  
router.get("/api/school/:id", getSch);
  
router.post("/api/school", jsonParser, postSch);
  
router.delete("/api/school/:id", deleteSch);
  
router.put("/api/school", jsonParser, putSch);


  module.exports = router;