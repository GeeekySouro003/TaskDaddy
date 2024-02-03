import userModel from "../Models/Usermodel.js";
import bcrypt from  "bcrypt";
import jwt from 'jsonwebtoken';


//get all users 

export const getAllUsers = async(req,res) => {
  try {
    let users =await userModel.find();

    users=users.map((user)=> {
      const{password,...otherDetails} =user._doc

      return otherDetails
    })
    res.status(200).json(users)
    
  } catch (error) {
    res.status(500).json(err);
    
  }
}
export const getUser = async(req,res) =>{
    const id=req.params.id;

    try{

        if(password)
        {
            const salt= await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password,salt);
        }
        const user=await userModel.findById(id);
        if(user)
        {
            const{password,...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("No such user exists");
        }

    }
    catch(err){
        res.status(500).json(err);
    }

};

export const updateUser = async(req,res) =>{
    const id=req.params.id;
    const{_id,currentUseradminStatus,password} = req.body;


    if(id=== _id)
{
    try{

        if(password){
            const salt=await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        }
        const user=await userModel.findByIdAndUpdate(id,req.body,{new:true});
        const token =jwt.sign(
          {username:user.username,id:user._id},
          process.env.JWT_KEY,{expiresIn:"1h"}
        )
        res.status(200).json({user,token});
        
    }
    catch(err){
        res.status(500).json(err);

    }
}
else{
    res.status(403).json("Profile does not match!!");
}
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId, currentUserAdminStatus } = req.body;
  
    if (currentUserId === id || currentUserAdminStatus) {
      try {
        await userModel.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Access Denied! you can only delete your own profile");
    }
  };
// follow profiles
export const followUser = async (req, res) => {
    const id = req.params.id;
  
    const { _id } = req.body;
    console.log(id,_id)
  
    if (_id === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await userModel.findById(id);
        const followingUser = await userModel.findById(_id);
  
        if (!followUser.followers.includes(_id)) {
          await followUser.updateOne({ $push: { followers: _id } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          res.status(403).json("User is Already followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };

//unfollow 
  export const UnFollowUser = async (req, res) => {
    const id = req.params.id;
  
    const { _id } = req.body;
  
    if (_id === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await userModel.findById(id);
        const followingUser = await userModel.findById(_id);
  
        if (followUser.followers.includes(_id)) {
          await followUser.updateOne({ $pull: { followers: _id } });
          await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("Profile Unfollowed!");
        } else {
          res.status(403).json("Profile is not followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  };