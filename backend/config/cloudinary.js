const cloudinary = require("cloudinary").v2
require("dotenv").config();
exports.connectCloudinary =()=>{
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_CLOUD_KEY,
            api_secret : process.env.CLOUDINARY_CLOUD_SECRET
        })

    } catch (error) {
        console.log(error)
    }
}
