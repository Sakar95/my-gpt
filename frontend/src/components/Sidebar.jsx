import React from 'react';
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllChats } from "../operations/chatApi";

function Sidebar({ text }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { messages } = useSelector((state) => state.chat)

    const clearConversation = () => {
        if (user?._id) {
            dispatch(deleteAllChats(user._id));
        }
    };

    return (
        <div className="w-full md:w-[270px] bg-gray-900 p-4 flex flex-col md:text-center">
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {user?.userName.slice(0, 2).toUpperCase()}
                </div>
                <span className="ml-3 font-semibold">{user?.userName}</span>
            </div>
            <div className="flex-grow">
                <p className="text-sm text-gray-400 mb-4">
                    {text}
                </p>
            </div>

            {
                messages.length !== 0 ? (
                    <button
                        onClick={clearConversation}

                        className="flex items-center justify-center w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition duration-300 ease-in-out"
                    >
                        <Trash2 className="mr-2 h-5 w-5" />
                        Clear Conversation
                    </button>
                ) : (<></>)
            }


        </div>
    );
}

export default Sidebar;
