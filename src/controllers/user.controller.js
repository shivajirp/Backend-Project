import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler (async (req,res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    // get user details from user using postman
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    // empty data validation
    if([fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check for existing user
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // check for images, check for avatar(required)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(req.files)

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }


    // create user object - create entry in DB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password & refreshToken from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // api response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export {registerUser}   