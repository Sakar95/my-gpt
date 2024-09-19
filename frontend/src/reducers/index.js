import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import chatReducer from "../slices/chatSlice"
import imageReducer from "../slices/imageSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    profile: profileReducer,
    chat: chatReducer,
    image : imageReducer
    
})

export default rootReducer;