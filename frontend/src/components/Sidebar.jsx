import React from 'react'
import { Trash2} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import {deleteAllChats} from "../operations/chatApi"

function Sidebar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.profile);
    const clearConversation = () => {
        if (user?._id) {
            dispatch(deleteAllChats(user._id));
        }
    };
  return (
    <div className="w-full md:w-[270px] bg-gray-800 p-4 flex flex-col md:text-center">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {user?.userName.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="ml-3 font-semibold">{user?.userName}</span>
                </div>
                <div className="flex-grow">
                    {/* <h2 className="text-xl font-bold mb-4">Gemini Chat</h2> */}
                    <p className="text-sm text-gray-400 mb-4">
                        Start a conversation with Your own AI and explore the power of artificial intelligence.
                    </p>
                </div>
                <button
                    onClick={clearConversation}
                    className="flex items-center justify-center w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-300 ease-in-out"
                >
                    <Trash2 className="mr-2 h-5 w-5" />
                    Clear Conversation
                </button>
            </div>
  )
}

export default Sidebar
