import { useState, useEffect } from "react"
import { Menu, X, LogIn, UserPlus, MessageCircle, Image, LogOut, Home, Trash } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../operations/authApi"
import { jwtDecode } from "jwt-decode"
import { deleteAllChats } from "../operations/chatApi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch();

  // Get token and user profile info from Redux store
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile);


  const clearConversation = () => {
    if (user?._id) {
        dispatch(deleteAllChats(user._id));
    }
};

  // Handle logout
  
  
  const handleLogout = () => {
    dispatch(logout(navigate)); // Dispatch logout action
  };

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
      dispatch(logout(navigate));
      return;
    }

    const remainingTime = expirationTime - Date.now();
    const timer = setTimeout(() => {
      dispatch(logout(navigate));
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [token, dispatch, navigate]);

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-40">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4 text-2xl  text-purple-400 cursor-pointer"
              style={{ fontFamily: "Ubuntu", fontWeight: "500" }}
              onClick={() => navigate("/")}
            >Synapse.ai</div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {token ? (
                <>
                  <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                  <Link to="/chat" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat
                  </Link>
                  <Link to="/image" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <Image className="mr-2 h-4 w-4" />
                    Analyze image
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                  
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                  <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
            {token ? (
              <>
                <Link to="/chat" className="text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </Link>
                <Link to="/image" className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                <Image className="mr-2 h-4 w-4" />
                  Analyze Image
                </Link>

                <button
                  onClick={ clearConversation}
                  className=" text-white flex items-center px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out w-full text-left"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Chats
                </button>

                <button
                  onClick={ handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out w-full text-left"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
                
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                  Login
                </Link>
                <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out shadow-lg ">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
