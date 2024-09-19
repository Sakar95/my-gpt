import { createSlice } from "@reduxjs/toolkit";


// Initial state for the upload and content generation
const initialState = {
  fileUri: null,
  generatedContent: "",
  loading: false,
  error: null,
};

// Create the slice for file upload and content generation
const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setFileUri(state, action) {
      state.fileUri = action.payload;
    },
    setGeneratedContent(state, action) {
      state.generatedContent = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearState(state) {
      state.fileUri = null;
      state.generatedContent = "";
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions from the slice
export const { setLoading, setFileUri, setGeneratedContent, setError, clearState } =
  fileUploadSlice.actions;
export default fileUploadSlice.reducer;