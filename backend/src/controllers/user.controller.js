import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"




const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wron while generating Refresh & Access Token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    
    const { fullname, email, username, password } = req.body
    console.log(email);
    
    if (
        [fullname, email, username, password].some((field) =>
        field === undefined ||
        field?.trim() === "")
    ){
        throw new ApiError(400, "All Fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    if (existedUser)
        throw new ApiError(409, "User with this email/username already exists")

    const avatarLocalPath = req.files?.avatar[0]?.path

    if(!avatarLocalPath)
        throw new ApiError (400, "Avatar is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar)
        throw new ApiError(400, "Avatar is required")

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!")
    )
})

const loginUser = asyncHandler( async(req, res) => {
    const {email, username, password} = req.body
    console.log(req.body);
    
    if (!email && !username) {    
        throw new ApiError (400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if (!user) {
        throw new ApiError(404, "User not Found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await 
    generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

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
            "User logged in Successfully"
        )
    )
})

const logoutUser = asyncHandler( async(req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
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
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken", options)
        .json( new ApiResponse(200, {}, "User logged out"))

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body
    
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json( new ApiResponse(200,{}, "Password changed Successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    console.log("user: ",req.user);
    
    return res
    .status(200)
    .json(new ApiResponse(200,req.user, "Current User Fetched Successfully"))
})


const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
        .select("_id username avatar")
    
        return res
            .status(201)
            .json(new ApiResponse(201, users, "all users fetched"))
})

export {
    registerUser, 
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    getAllUsers
}