import axios from "axios";
import toast from "react-hot-toast";
import { setLoading, setFileUri, setGeneratedContent, setError } from "../slices/imageSlice"

export function uploadAndGenerateContent(file) {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        dispatch(setLoading(true));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/image/upload-and-generate`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { success, fileUri, generatedContent } = response.data;

            if (success) {
                // Update state with the uploaded file URI and the generated content
                dispatch(setFileUri(fileUri));
                dispatch(setGeneratedContent(generatedContent));
                // toast.success("File uploaded and content generated successfully!");
            } else {
                throw new Error("Failed to upload file or generate content.");
            }
        } catch (error) {
            console.error("Upload and Generate Content Error:", error);
            dispatch(setError(error.response?.data?.message || "Error occurred"));
            // toast.error(error.response?.data?.message || "Error occurred");
        }

        dispatch(setLoading(false));
    };
}