import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Send, Forward } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { generateContent, fetchAllChats } from "../operations/chatApi";

export default function ChatPage() {
    const { user } = useSelector((state) => state.profile);
    const { messages, loading } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false); // New state to track bot response

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchAllChats(user._id));
        }
    }, [dispatch, user]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === "") return;

        // Add user message to the list
        dispatch(generateContent(inputMessage, user?._id));
        setInputMessage("");

        setIsTyping(true);
    };

    useEffect(() => {
        if (!loading) {
            setIsTyping(false);
        }
    }, [loading]);

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)] bg-gray-800 text-gray-100">
            {/* Left Section */}
            <Sidebar />
            

            {/* Right Section */}
            <div className="w-full md:w-full flex flex-col relative">
                {/* Greeting Section */}
                <div className="p-2 m-2 sm:m-8">
                    <h1 className="font-bold">
                        {/* Large greeting for "Hii {username}" */}
                        <span className="block  bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl">
                            Hello {user?.name} !!
                        </span>

                        {/* Smaller text for "How can I help you?" */}
                        <span className="block text-xl md:text-2xl lg:text-3xl mt-2 bg-gradient-to-r from-gray-200  to-gray-600 bg-clip-text text-transparent ">
                            How can I help you?
                        </span>
                    </h1>
                </div>


                {/* Chat History */}
                <div className="flex-grow  font-sans  p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className="mb-4">
                            {/* User Message on the Right */}
                            {message.userMessage && (
                                <div className="flex justify-end items-start my-4">
                                    {/* User initials (avatar) */}
                                    <Forward className="mr-2 mt-3 h-4 w-4 sm:mr-1" />
                                    <div className="w-8 h-8 mt-1 rounded-full bg-purple-600 flex items-center justify-center text-white font text mr-2">
                                        {user?.userName.slice(0, 2).toUpperCase()}
                                    </div>
                                    {/* User message */}
                                    <div className="inline-block p-2 rounded-lg bg-purple-600 text-white max-w-xs">
                                        {message.userMessage}
                                    </div>
                                </div>
                            )}

                            {/* Bot Response on the Left */}
                            {message.botResponse && (
                                <div className="text-left my-4">
                                    <div className="flex items-start p-2 rounded-lg bg-gray-700 text-gray-100 max-w-3xl">
                                        {/* SVG icon */}
                                        <svg className="h-8 w-8 flex-shrink-0 text-purple-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>

                                        {/* Bot response */}
                                        <div className="mt-1">
                                            {message.botResponse}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="text-left mb-4">
                            <div className="inline-block p-2 rounded-lg bg-gray-700 text-gray-100">
                                Your GPT is typing...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Field */}
                <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 sticky bottom-0  ">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="flex-grow p-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-r-md transition duration-300 ease-in-out"
                        >
                            <Send className="h-6 w-6" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


