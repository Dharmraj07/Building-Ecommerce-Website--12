import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Movies from the API
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("https://calcium-vector-405713-default-rtdb.firebaseio.com/movies.json");
  if (response.data == null) return [];

  // Transform the data as needed
  const transformedMovies = Object.keys(response.data).map((key) => ({
    id: key, // Use Firebase key as id
    title: response.data[key].title,
    releaseDate: response.data[key].releaseDate,
    openingText: response.data[key].openingText,
  }));
  return transformedMovies;
});

// Add a new movie to the API
export const addMovie = createAsyncThunk("movies/addMovie", async (newMovie) => {
  const response = await axios.post(
    "https://calcium-vector-405713-default-rtdb.firebaseio.com/movies.json",
    newMovie
  );
  // Return the new movie with its Firebase-generated ID
  return { id: response.data.name, ...newMovie };
});

// Delete a movie from the API
export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (movieId) => {
  await axios.delete(`https://calcium-vector-405713-default-rtdb.firebaseio.com/movies/${movieId}.json`);
  return movieId;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      });
  },
});

export default moviesSlice.reducer;
