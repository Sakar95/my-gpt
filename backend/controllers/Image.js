const FileUpload = require("../models/Image");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const Upload = require("../utils/upload")

// Upload File and Generate Content


exports.uploadAndGenerateContent = async (req, res) => {
    try {
        const image = req.file.path
        const uploadResult = await Upload.uploadFile(image)

        const uploadedFile = new FileUpload({
            displayName: req.file.originalname,
            fileUri: uploadResult.secure_url,
            mimeType: req.file.mimetype,
        });
        await uploadedFile.save();

        

        // Upload the file to Google AI
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
        const uploadResultGoogle = await fileManager.uploadFile(req.file.path, {
            mimeType: req.file.mimetype,
            displayName: req.file.originalname,
        });


        // console.log("Upload result on goofle",uploadResultGoogle)
        // Interact with Google Generative AI for content generation
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            "Tell me about this image.",
            {
                fileData: {
                    fileUri: uploadResultGoogle.file.uri, 
                    mimeType: req.file.mimetype,
                },
            },
        ]);

        // Send response with the generated content
        res.status(200).json({
            success: true,
            message: "File uploaded and content generated successfully.",
            fileUri: uploadResult.secure_url, 
            generatedContent: result.response.text(),
        });


    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            success: false,
            message: "Error processing your request.",
        });
    }
};






