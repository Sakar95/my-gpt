import { useState } from "react"
import { Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from '../operations/authApi';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const { email, password } = formData

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("Form submitted:", formData)
        dispatch(login(email, password, navigate))


        setFormData({
            email: "",
            password: "",
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-8 px-2 py-8 border border-purple-200 shadow-lg shadow-purple-500/50 rounded-md flex flex-col items-center justify-center">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-bold text-purple-300">
                        LOGIN
                    </h2>
                </div>
                <hr className="border-purple-300 w-full " />

                <form className="mt-8 space-y-6 w-3/4  flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <div className="rounded-md w-full shadow-sm -space-y-px">

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
                                    className="appearance-none  relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800 bg-opacity-50 "
                                    placeholder="Email address"
                                    value={formData.email}
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
                                    className="appearance-none  relative block w-full px-3 py-2 pl-10 border-b border-gray-700 rounded placeholder-gray-500 text-purple-300 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800 bg-opacity-50 "
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
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out  "
                        >
                            LOGIN
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account??{" "}
                        <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}