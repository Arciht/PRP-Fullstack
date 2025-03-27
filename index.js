const express = require ('express')
const Student = require('./students');
const bodyParser = require('body-parser');
const app = express()
require('./db')
app.get('/', (req,res)=>{
    res.status(200).send("Hello World");
})
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
app.post('/save/data',async(req , res)=>{
    try{
        let stu = new Student();
        let {marks, name ,age , subject} = req.body;
        stu.marks = marks;
        stu.name = name;
        stu.age = age;
        stu.subject = subject;
        stu = await stu.save();
        res.status(200).send({data: stu, msg: "Data saved"});

    }catch(err){
        console.log(err);
        res.status(500).send({data: err});
    }
})
app.get('/find/data',async(req , res)=>{
    try{
        console.log(req.query.namee)
        let stuData = await Student.find({name:req.query.namee});
        res.status(200).send({data:stuData})
        // let stuData = await Student.find();
        // let totalmarks = 0;
        // stuData.map((d)=>{
        //     totalmarks += d.marks;
        // })
        // res.status(200).send({data: stuData, msg: "Data"});
        // res.status(200).send({data:totalmarks});

    }catch(err){
        console.log(err);
        res.status(500).send({data: err,msg: "Error"});
    }
})
app.put('/update/data',async(req , res)=>{
    try{
       let stuData = await Student.findOneAndUpdate({name : req.body.name},{$set:{marks:req.body.marks}})
       res.status(200).send({data:stuData});
    }catch(err){
        console.log(err);
        res.status(500).send({data: err,msg: "Error"});
    }
})
app.listen(6000, ()=>{
    console.log("server started again");
})
