const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

app.get("/api/school", function (req, res) {

  let content = fs.readFileSync("school.json", "utf8");
  let schools = JSON.parse(content);
  res.send(schools);
});

app.get("/api/school/:id", function(req, res) {

  let id = req.params.id;
  let content = fs.readFileSync("school.json", "utf8");
  let schools = JSON.parse(content);
  let school;

  for (let i = 0; i < schools.length; i++) {
    if (schools[i].id == id) {
      school = schools[i];
      break;
    }
  }

  if (school) {
    res.send(school);
  } else {
    res.status(404).send("School isn't found");
  }

});

app.post("/api/school", jsonParser, function (req, res) {
  
  if (!req.body) res.sendStatus(400);

  let shClass = req.body.class;
  let shSubject = req.body.subject;
  let school = {class: shClass, subject: shSubject};

  let data = fs.readFileSync("school.json", "utf8");
  let schools = JSON.parse(data);

  let id = Math.max(...schools.map((school) => school.id));
  
  if (Number.isFinite(id)) {
    school.id = id + 1;
  } else {
    school.id = 1;
  }
  
  schools.push(school);

  data = JSON.stringify(schools);
  fs.writeFileSync("school.json", data);
  res.send(school);
});

app.delete("/api/school/:id", function (req, res) {

  let id = req.params.id;
  let data = fs.readFileSync("school.json", "utf8");
  let schools = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < schools.length; i++) {
    if (schools[i].id == id) {
      index = i;
      break;
    }
  }

  if (index > -1) {
      const school = schools.splice(index, 1)[0];
          data = JSON.stringify(schools);
          fs.writeFileSync("school.json", data);
         
          res.send(school);
  } 
  else {
    res.status(404).send("School isn't found by ID");
  }
});

app.put("/api/school", jsonParser, function (req, res) {

  if (!req.body) res.status(400).send("Failed to change");
  
  let shId = req.body.id;
  let shClass = req.body.class;
  let shSubject = req.body.subject;

  let data = fs.readFileSync("school.json", "utf8");
  let schools = JSON.parse(data);
  let school;

  for (let i = 0; i < schools.length; i++) {
    if (schools[i].id == shId) {
      school = schools[i];
      break;
    }
  }

  if (school) {
    school.subject = shSubject;
    school.class = shClass;
    let data = JSON.stringify(schools);
    fs.writeFileSync("school.json", data);
    res.send(school);
  } 
  else {
    res.status(404).send(school);
  }
});

app.listen(3000, function() {
  console.log("Server started");
});

