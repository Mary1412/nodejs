const fs = require("fs");


const getSchs = (req, res)=>{
    let content = fs.readFileSync("school.json", "utf8");

    let schools = JSON.parse(content);
    res.send(schools);
};

const getSch = (req, res)=>{
    
    let id = req.params.id;
    let content = fs.readFileSync("school.json", "utf8");
    let schools = JSON.parse(content);
    let school;

    var codes = search(id);
    school = codes[1];
    console.log(codes[1])
  
    if (school) {
      res.send(school);
    } else {
      res.status(404).send("School isn't found");
    }
};

const postSch = (req, res)=>{
     
    if (!req.body) res.sendStatus(400);
  
    let shClass = req.body.class;
    let shSubject = req.body.subject;
    let school = {class: shClass, subject: shSubject};
  
    let data = fs.readFileSync("school.json", "utf8");
    let schools = JSON.parse(data);
  
    let uuid = require('uuid');
    let id=String(uuid.v1())
    school.id = id;
    console.log(uuid.v1())
    
    schools.push(school);
  
    data = JSON.stringify(schools);
    fs.writeFileSync("school.json", data);
    res.send(school);
};


const deleteSch = (req, res)=>{
    let id = req.params.id;
    let data = fs.readFileSync("school.json", "utf8");
    let schools = JSON.parse(data);
    let index = -1;
    
    var codes = search(id);
    index = codes[0];
  
    if (index > -1) {
        const school = schools.splice(index, 1)[0];
            data = JSON.stringify(schools);
            fs.writeFileSync("school.json", data);
           
            res.send(school);
    } 
    else {
      res.status(404).send("School isn't found by ID");
    }

};

const putSch = (req, res)=>{
    
    if (!req.body) res.status(400).send("Failed to change");
    
    let shId = req.body.id;
    let shClass = req.body.class;
    let shSubject = req.body.subject;
  
    let data = fs.readFileSync("school.json", "utf8");
    let schools = JSON.parse(data);
   
    var codes = search(shId);
    let school = codes[1];
 
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
};




function search(id) {

    let data = fs.readFileSync("school.json", "utf8");
    let schools = JSON.parse(data);

   let school;
   let index;

    for (let i = 0; i < schools.length; i++) {
        if (schools[i].id == id) {
          school = schools[i];
          index = i;
          break;
        }
      }

    return [index,school] 
}


module.exports={
    getSchs,
    getSch,
    postSch,
    deleteSch,
    putSch
};
