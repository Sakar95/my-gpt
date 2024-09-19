import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../operations/authApi";
import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(5 * 60) 
  const inputRefs = useRef([])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus()
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpString = otp.join("")
    console.log("Submitted OTP:", otpString)

    if (signupData) {
        const { name, email, username, password } = signupData;
        console.log("On verify otp paaage",name, username, email, password, otpString)
        dispatch(signUp(name, username, email, password, otpString, navigate));
      } else {
        toast.error("Signup data missing. Please sign up again.");
        navigate("/signup");
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-300">
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the 6-digit code sent to your device
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-2xl font-semibold text-purple-300 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Clock className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out shadow-lg hover:shadow-purple-500/50"
            >
              Verify OTP
            </button>
          </div>
        </form>
        <div className="text-center">
          {/* <button
            onClick={() => setTimeLeft(5 * 60)}
            className="text-sm font-medium text-purple-400 hover:text-purple-300"
            disabled={timeLeft > 0}
          >
            Resend OTP
          </button> */}
        </div>
      </div>
    </div>
  )
}