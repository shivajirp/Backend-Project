import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});


// method
const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: 'auto'
            }
        )

        // console.log("File is uploaded on cloudinary", response.url)
        fs.unlinkSync(localFilePath)
        return response;

    } catch(error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {

    try {
        if(!publicId) {
            throw new ApiError("Public id not generated")
        }
        
        await cloudinary.uploader.destroy(publicId)
        
    } catch (error) {
        throw new ApiError("Error deleting old avatar", error)
    }    
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}