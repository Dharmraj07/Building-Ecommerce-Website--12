import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to add a user
export const addUser = createAsyncThunk(
  "contacts/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://calcium-vector-405713-default-rtdb.firebaseio.com/contacts.json",
        user
      );
      return { status: "success", ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Optional: Define additional reducers here, if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts.push(action.payload); // Assuming the added user data is returned
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add user";
      });
  },
});

export default contactsSlice.reducer;
