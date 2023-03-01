const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload")
const cors=require("cors");
const secret = "Hari";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json());



//checking
app.get("/", (req, res) => {
  res.send("ok");
});


//connection
async function getConnection() {
  await mongoose.connect("mongodb://localhost/studentResults");
  console.log("db connected");
}
mongoose.set("strictQuery", false);
mongoose.set("strictQuery", true);
getConnection();

// Initial login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { userId, password } = req.body;
  
  if (userId == "Admin" && password == "123456") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secret
    );
    return res.status(200).json({
      status: "Succces",
      message: "Login successful",
      token,
    });
  } else {
    return res.status(400).json({
      status: "Failed",
      message: "jwt not valid",
    });
  }
});

//generation of token for verification 

app.use("/addresults", (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
console.log(token);
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          status: "Failed",
          message: "Token is not valid",
        });
      }
      req.user = decoded.data;
      next();
    });
  } else {
    res.status(403).json({
      status: "Failed",
      message: "User is not authenticated",
    });
  }
});

// adding of results 

app.post("/addresults", async (req, res) => {
  console.log(req.body);
  const {name,rollNum,section,sub1,sub2,sub3,sub4,sub5}=req.body
  if(name!="",rollNum!="",section!=""){
    const results = await Student.create({
      name:name,
      rollNum:rollNum,
      section:section,
      sub1:sub1,
      sub2:sub2,
      sub3:sub3,
      sub4:sub4,
      sub5:sub5,
      date: new Date(),
    });
    console.log(results);
    return res.status(201).json({
      status: "success",
      results
      
    });
  }
 
    res.status(500).json({
      status: "Failed",
      message: err.message + "at schema",
    });
  
});

app.get("/studentresults",async (req,res)=>{
  const param1=req.query.htnum;
  console.log(param1);
  try {
    const StudentResult= await Student.findOne({ rollNum: req.query.htnum })
    res.send(StudentResult)
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      msg:"Data Not Found",
      message: e.message,
    });
  }

})
app.get("*", (req, res) => {
  res.status(404).send("API Not Found");
});
//==========================================
// const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   name: String,
//   rollNum: String,
//   section: String,
//   subMarks: String
// });

// const Data = mongoose.model('Data', dataSchema);

// app.post('/data', upload.array(), (req, res) => {
//   const data = {
//     name: req.body.name,
//     rollNum: req.body.rollNum,
//     section: req.body.section,
//     subMarks: req.body.subMarks
//   };

//   const newData = new Data(data);
//   newData.save((error) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send('Data saved successfully!');
//     }
//   });
// });

app.listen(5000, () => console.log("Server started"));
