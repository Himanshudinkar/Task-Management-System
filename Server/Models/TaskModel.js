const mongoose = require("mongoose");
const emptaskSchema = new mongoose.Schema({
    tasktitle:String,
    taskdescription:String,
    completiondays:String,
    taskstatus:{
        type:String, 
        default:"Not Completed"
    }, 
    empreport:{    
        type:String,
        default:"Pending"
    },
    empid:{type:mongoose.Types.ObjectId, ref:"employee"}

})
module.exports = mongoose.model("emptask", emptaskSchema);