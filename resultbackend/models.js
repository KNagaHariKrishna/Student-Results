const mongoose=require("mongoose")
const Schema= mongoose.Schema

const StudentSchema= new Schema({
    name:{type:String,require:true},
    rollNum:{type:String, require:true,unique: true},
    section:{type:String,require:true},
    sub1:{type:String,default: '' },
    sub2:{type:String,default: ''},
    sub3:{type:String,default: ''},
    sub4:{type:String,default: ''},
    sub5:{type:String,default: ''},
    // sub6:{type:String},
    // sub7:{type:String},
    // sub8:{type:String},
    // sub9:{type:String},
    // sub10:{type:String},
    // sub11:{type:String},
    // sub12:{type:String},
    // sub13:{type:String},
    // sub14:{type:String},
    // sub15:{type:String},
    // sub16:{type:String},
    // sub17:{type:String},
})

const studentModel=mongoose.model('Students',StudentSchema)
module.exports=studentModel