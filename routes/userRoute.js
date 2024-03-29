const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
 
    const {name,email,password}= req.body
    const newuser = new User({name,email,password})

  try {
        newuser.save()
        console.log("user saved ... from route")
        res.status(200).json({
          success:true,
          message:"Register Success"
        })
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/login",async(req,res)=>{
const {email,password}=req.body
try {
  const user = await User.find({email,password})
  if(user.length>0)
  {
    const currentUser = {
      name : user[0].name,
      email : user[0].email,
      _id : user[0]._id,
      isAdmin :user[0].isAdmin
    }
    res.status(200).send(currentUser)
  }
  else{
    res.status(404)
  }
} catch (error) {
  res.status(404)
}
})




router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});



module.exports = router;
