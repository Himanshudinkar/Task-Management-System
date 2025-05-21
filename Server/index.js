const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const AdminRoute = require("./Route/AdminRoute")
const EmpRoute = require("./Route/EmpRoute")


require("dotenv").config();
const port = process.env.PORT || 8080;
const dbcon = process.env.DBCON;
mongoose.connect(dbcon).then(()=>{
    console.log("DB Connnected !!!");
})

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use("/admin",AdminRoute);
app.use("/employee",EmpRoute);


app.listen(port,()=>{
    console.log(`Server run on ${port}`);
})