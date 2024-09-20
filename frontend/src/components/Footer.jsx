export default function Footer() {
    return (
      <footer className="bg-gray-900 text-purple-300 py-2 sm:py-4 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="text-center mx-8 md:text-left  md:mb-0">
            <span className="font-semibold">Your Personalized AI</span>
          </div>
          <div className="text-center md:text-right">
            <span className="text-sm">
              Made with <span className="text-red-500">❤️</span> by Sakar
            </span>
          </div>
        </div>
      </footer>
    )
  }