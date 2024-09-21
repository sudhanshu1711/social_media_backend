import { User } from "../Models/user.models.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import {ApiResponse} from "../Utils/ApiResponse.js"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, firstName, lastName,email } = req.body;
    if ([firstName, lastName, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    if (!username) {
        throw new ApiError(400, "Username is required");
    }
    const usernameLower = username.toLowerCase();
    const existedUser = await User.findOne({$or:[{ username: usernameLower },{email}]});

    if (existedUser) {
        throw new ApiError(409, "User with this username already exists");
    }
    const user = new User({
        username: usernameLower,
        email,
        password, 
        firstName,
        lastName
    });
    await user.save()
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return res.status(201).json({
        status: 201,
        data: createdUser,
        message: "User registered successfully"
    });
});

const loginUser =asyncHandler(async(req,res)=>{
    const {username,password,email} =req.body
    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
    const validity= await user.isPasswordCorrect(password)

    if(!validity){
        throw new ApiError(401, "Invalid user credentials")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
});

const logoutUser =asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})
export { registerUser,loginUser,logoutUser };
