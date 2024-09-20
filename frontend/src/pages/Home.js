import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import RobotChat from "../Assets/Robot_img.webp"
import RobotImg from "../Assets/Robot_Chat.png"
import HomePageBox from "../components/HomePageBox";


const phrases = [
    "Your Own GPT!",
    "Build with Gemini!"
];

export default function Home() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    
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
        <div className=" flex flex-col items-center justify-center min-h-[calc(100vh-65px)] bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-4xl w-full space-y-8">
                <div>
                    <h1 className="mt-2 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-20"
                        style={{ fontFamily: "Ubuntu", fontWeight: "500" }}
                    >
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
                    <p className="mt-2 text-center text-xl text-gray-400"
                        
                    >
                        Experience the power of AI with Synapse
                    </p>
                </div>

                <div className="relative h-12 overflow-hidden z-10">
                    <motion.div
                        className="absolute whitespace-nowrap text-purple-400 text-lg text-center z-10 "
                        animate={{
                            x: ["-100%", "80%"],
                        }}
                        transition={{
                            duration: 10,
                            ease: "linear",
                            repeat: Infinity,
                        }}

                        style={{ fontFamily: "Poppins" }}
                    >
                        Discover • Learn • Engage • Explore • Create • Innovate • Collaborate
                    </motion.div>
                </div>

                {token ? (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    
                    <HomePageBox text={"Decode  Snap"} path={"image"} img={RobotImg} subtext={"Analyze Your Image"}/>
                    
                    <HomePageBox text={"Chat with me !!"} path={"chat"} img={RobotChat} subtext={"Ask you your Doubts"}/>
                    </div>
                ) : (
                    <>


                        <div className="mt-8 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg shadow-purple-500/50 border border-purple-500 max-w-xl mx-auto"
                            style={{ fontFamily: "Poppins" }}
                        >
                            <h2 className="text-2xl  font-semibold text-purple-300 mb-4 text-center">
                                Start Exploring
                            </h2>
                            <p className="text-gray-300 mb-6 text-center">
                                Analyze Images, Ask Questions. 
                            </p>
                            <Link
                                to="/login"
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out shadow-lg"
                            >
                                
                                Login to begin.
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
