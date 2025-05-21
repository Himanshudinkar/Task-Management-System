const AdminModel = require("../Models/AdminModel")
const EmpModel = require("../Models/EmpModel")
const TaskModel = require("../Models/TaskModel")
const AutoPass = require("../Middleware/PassGenrate")
const nodemailer = require("nodemailer")


const adminlogin = async (req,res) =>{
    const { userid, password } = req.body

    try{
        const Admin = await AdminModel.findOne({userid:userid});

        if(!Admin){
            res.status(400).send({msg:"Inavlid user Id"});

        }
        if(Admin.password!=password)
        {
            res.status(400).send({msg:"Invalid Password"});
        }
        res.status(200).json({msg1:"Login Successsfully"})
    }catch(error){
        console.log(error);
        res.status(400).send({msg:"Database Not Respond"});

    }
}

const addemp = async (req,res) =>{
    const { empname,emptype ,email} = req.body

    const MyPass = AutoPass.autoPassword();

    console.log(MyPass)
    try {
        const Data = await EmpModel.create({

            empname:empname,
            email:email,
            emptype:emptype,
            password:MyPass,
        })


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "himanshudinkar43@gmail.com",  
              pass: "kzut ydgq yphh ersm", 
            },
          });
    
          let maildetails = {
            from : "himanshudinkar43@gmail.com",
            to : email,
            subject : "New Task Assign",
            text : `Dear ${empname} Your Account created with password : ${MyPass} 
             You can login using with your Email account`
          }


          transporter.sendMail(maildetails )
          console.log("mail send successfully")
          console.log(MyPass)

          res.status(200).send({msg1:"Succesfully Assignd"})
    } catch (error) {
        res.status(400).send({msg:"Database not Connect"})
    }



}



const empDisplay=async(req, res)=>{
    try{
        const User= await EmpModel.find();
        res.status(200).send(User);

    }catch(error)
    {
        console.log(error);
    }
}


const assignTaskSave =async(req,res)=>{
    const {empid, tasktitle, taskdescription, completiondays}=req.body;
    try {
        const Employee = await TaskModel.create({
            tasktitle:tasktitle,
            taskdescription:taskdescription,
            completiondays:completiondays,
            empid:empid

        })
        res.status(200).send("Task Successfully Assigned!!!");
    } catch (error) {
        console.log(error);   
    }
}


const viewtask = async(req,res) =>{
    try {
        const Task = await TaskModel.find().populate("empid");
        res.status(200).send(Task);
    } catch (error) {
        console.log(error);
    }
}


const deltask = async(req,res) =>{
    console.log(req.body)
    const {id} = req.body
    const deletedata = await TaskModel.findByIdAndDelete(id);
    res.send(deletedata)
}


const updatetask  = async(req,res) =>{

    console.log(req.body)
   const  {id,tasktitle,taskdescription,completiondays} = req.body

   const data = await TaskModel.findByIdAndUpdate(
    id,
    {
      tasktitle,
      taskdescription,
      completiondays
    },
    { new: true } 
 )

   res.send("okk")
}


module.exports = {
    adminlogin,
    addemp,
    empDisplay,
    assignTaskSave,
    viewtask,
    deltask,
    updatetask
}