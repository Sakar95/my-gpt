import { useState, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { uploadAndGenerateContent } from "../operations/imageApi";
import Sidebar from "../components/Sidebar";

export default function ImageUploadPage() {
    const { fileUri, generatedContent, loading } = useSelector((state) => state.image);
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState(null); // State to handle selected image
    const [isUploading, setIsUploading] = useState(false); // Track upload state

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (selectedFile) {
            setIsUploading(true);
            dispatch(uploadAndGenerateContent(selectedFile));
        }
        
    };

    useEffect(() => {
        if (!loading) {
            setIsUploading(false);
        }
    }, [loading]);
    console.log(fileUri);
    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-900 text-gray-100">
            {/* <Sidebar text={"Upload your image for an in-depth analysis and insights"}/> */}
            <div className=" flex flex-col  w-full max-w-lg mx-auto pt-16">
                <h1 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Upload an Image and Discover Its Secrets!</h1>

                {/* File Input Section */}
                <form onSubmit={handleUpload} className="p-4 bg-gray-800 rounded-md shadow-md m-4">
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="file-upload" className="cursor-pointer bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition">
                            <ImageIcon className="h-6 w-6 inline-block mr-2" />
                            Select Image
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                        {selectedFile && (
                            <span className="text-gray-300">{selectedFile.name}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition duration-300 ease-in-out ${
                            isUploading || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isUploading || !selectedFile}
                    >
                        {isUploading ? "Uploading..." : "Upload & Generate Content"}
                    </button>
                </form>

                {/* Display Uploaded Image and Generated Content */}
                {fileUri && (
                    
                    <div className="mt-6 p-4 bg-gray-800 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-center">Uploaded Image</h2>
                        <img src={fileUri} alt="Uploaded" className="w-[200px] h-auto mb-4 mx-auto" />
                             
                        
                        <p className="bg-gray-700 p-3 rounded-md text-white">
                        <h3 className="text-lg font-semibold mb-2 text-center  text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-500 to-red-500">Your Image’s Story Uncovered</h3>
                            {generatedContent || "Generating content..."}
                        </p>
                    </div>
                )}

                {/* Loading Indicator */}
                {isUploading && (
                    <div className="text-center mt-4">
                        <p className="text-gray-400">Processing your image, please wait...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
