const express=require("express");
const mongoose=require("mongoose");
const path=require("path");

const app=express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}));
const port=8080;

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/regform");
const db = mongoose.connection

db.once("open",()=>{
    console.log("database is connected")
});

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
});

const Users = mongoose.model("data",userSchema)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"Form.html"));
});

app.post("/post",async(req,res)=>{
    const { name, email, pass } = req.body;

    const user= new Users({
        name,
        email,
        pass
    })
    await user.save()
    console.log(user)
    res.send("form submited!")
    
})

app.listen(port,()=>{
    console.log(`Server is running at port numner ${port}`);
})