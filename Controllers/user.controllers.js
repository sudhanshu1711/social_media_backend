import { User } from "../Models/user.models.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import {ApiResponse} from "../Utils/ApiResponse.js"

const getUser = asyncHandler(async (req,res) => {
    const id = req.params.id

    const user = await User.findById(id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(404,"user does not exist")
    }
   return res.status(200)
   .json(
    new ApiResponse(
        200, 
        {
            user
        },
        "User found"
    )
   )
})

const updateUser = asyncHandler(async(req, res) => {
    const {firstName,lastName, email} = req.body

    if (!firstName ||!lastName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                firstName,
                lastName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

//if the user is logged in
/* const deleteUser = asyncHandler(async (req, res) => {
    // Use the user ID from the authenticated request
    const userId = req.user._id;

    // Attempt to delete the user
    const user = await User.findByIdAndDelete(userId);

    // Check if the user was found and deleted
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Respond with a success message
    return res.status(200).json({
        message: "User deleted successfully",
        user: user // Optionally return the deleted user data
    });
}); */

const deleteUser = asyncHandler(async (req,res) => {
     const id = req.params.id

     const {currentUserId,currentAdminStatus} = req.body
     if(currentUserId===id||currentAdminStatus){
        try{
           await User.findByIdAndDelete(id)
           res.status(200).json("user deleted")
        }
        catch{
            res.status(403).json("Access denied")
        }
     }
})

const followUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId } = req.body;
  
    if (currentUserId === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(currentUserId);
  
        if (!followUser.followers.includes(currentUserId)) {
          await followUser.updateOne({ $push: { followers: currentUserId } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          res.status(403).json("User is Already followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  })

  const unfollowUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId } = req.body;
  
    if (currentUserId === id) {
      res.status(403).json("Action forbidden");
    } else {
      try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(currentUserId);
  
        if (followUser.followers.includes(currentUserId)) {
          await followUser.updateOne({ $pull: { followers: currentUserId } });
          await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("User unfollowed!");
        } else {
          res.status(403).json("User is not followed by you");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  })
export{getUser,updateUser,deleteUser,followUser,unfollowUser}
