const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    chatHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    ],
    // imageHistory: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Chat"
    //     }
    // ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);