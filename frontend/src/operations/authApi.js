import axios from "axios"
import toast from "react-hot-toast"
import { setLoading, setToken } from "../slices/authSlice"
import { setUser } from "../slices/profileSlice"


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            // console.log("SENDOTP API RESPONSE............")
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/sendotp`, { email })

            // console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            // console.log("SENDOTP API ERROR............", error)
            toast.error(error?.response?.data?.message)
        }

        dispatch(setLoading(false))
    }
}

export function signUp(
    name,
    userName,
    email,
    password,
    otpString,
    navigate
) {

    return async (dispatch) => {
        dispatch(setLoading(true))
        // console.log("Before try", { name, userName, email, password, otpString })
        const otp = otpString
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signup`, {
                name,
                userName,
                email,
                password,
                otp

            }
            );

            // console.log("Inside try--------------- response ",response)

            if (!response.data.success) {
                // console.error("Error here ------------",response.data.message)
                toast.error(response.data.message)
                throw new Error(response.data.message)
            }
            //   dispatch(setProgress(100));
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            //   dispatch(setProgress(100));
            console.log("SIGNUP API ERROR............", error)
            // toast.error("Signup Failed")
            // navigate("/signup")
        }
        dispatch(setLoading(false))
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        //   const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })

            // console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            // dispatch(setProgress(100))
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            dispatch(setUser({ ...response.data.user }))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/")
        } catch (error) {
            // dispatch(setProgress(100))
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        //   toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        toast.success("Logged Out Successfully")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }
}