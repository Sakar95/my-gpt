import { useState } from "react";
import { UserPlus, Mail, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../operations/authApi";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setLoading(true); 

        try {
            dispatch(setSignupData(formData));
            await dispatch(sendOtp(formData.email, navigate));
        } catch (error) {
            toast.error("Error sending OTP. Please try again.");
        } finally {
            setLoading(false); 
        }

        setFormData({
            name: "",
            email: "",
            username: "",
            password: "",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-8 px-2 py-8 border border-purple-200 shadow-md shadow-purple-500/50 rounded-md flex flex-col items-center justify-center">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-bold text-purple-300">
                        Create your account
                    </h2>
                </div>
                <hr className="border-purple-300 w-full " />

                <form className="mt-8 space-y-6 w-3/4 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <div className="rounded-md w-full shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 bg-opacity-50 "
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 bg-opacity-50 "
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserPlus className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 bg-opacity-50 "
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 bg-opacity-50 "
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out`}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <span>Loading...</span> // Show loading text if loading
                            ) : (
                                <span>Sign up</span> // Show Sign up text if not loading
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
