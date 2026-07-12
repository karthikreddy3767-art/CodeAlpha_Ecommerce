const mongoose = require("mongoose");

const uri =
"mongodb+srv://karthikreddy3767_db_user:KarthikReddy%4025@cluster0.5uehu9o.mongodb.net/codealpha?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
.then(()=>{
    console.log("✅ MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});