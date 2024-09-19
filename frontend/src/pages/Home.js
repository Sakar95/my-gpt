import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import Robot from "../Assets/Robot_img.webp"

// Add the phrases for the typing effect
const phrases = [
    "Your own GPT!",
    "Build with Gemini!"
];

export default function Home() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    // Typing effect logic
    useEffect(() => {
        const fullText = phrases[currentPhraseIndex];

        if (!isDeleting && currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && currentText === "") {
            setIsDeleting(false);
            setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        } else {
            const timeout = setTimeout(() => {
                const updateText = isDeleting
                    ? fullText.substring(0, currentText.length - 1)
                    : fullText.substring(0, currentText.length + 1);
                setCurrentText(updateText);
                setTypingSpeed(isDeleting ? 50 : 100);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }
    }, [currentText, isDeleting, typingSpeed, currentPhraseIndex]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-20">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPhraseIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                            >
                                {currentText}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                    <p className="mt-2 text-center text-xl text-gray-400">
                        Experience the power of AI conversation
                    </p>
                </div>

                <div className="relative h-12 overflow-hidden">
                    <motion.div
                        className="absolute whitespace-nowrap text-purple-400 text-lg"
                        animate={{
                            x: ["-100%", "0%", "0%", "-100%"],
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        Discover • Learn • Engage • Explore • Create • Innovate • Collaborate
                    </motion.div>
                </div>

                {/* Conditional rendering based on token */}
                {token ? (
                    <div className="mt-8 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg shadow-purple-500/50 border border-purple-500 cursor-pointer h-auto lg:h-56"
                    onClick={()=>navigate('/chat')}
                    >
                        <motion.img
                            src={Robot} 
                            alt="Robot"
                            className=" w-40 h-auto lg:h-40"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5  }}
                        />
                        

                        <motion.div
                            className="ml-2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <h2 className="text-4xl  text-purple-300 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Ask me!!</h2>
                        </motion.div>
                    </div>
                ) : (
                    // Show login prompt if not logged in
                    <>
                    
                    
                    <div className="mt-8 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg shadow-purple-500/50 border border-purple-500">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">
                            Start Chatting
                        </h2>
                        <p className="text-gray-300 mb-6 text-center">
                            Log in to access the full power of Gemini AI and start an engaging conversation.
                        </p>
                        <Link
                            to="/login"
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out shadow-lg"
                        >
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Login to Chat
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-purple-400 hover:text-purple-300"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
                    </>
                )}

                
            </div>
        </div>
    );
}
