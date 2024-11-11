// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/moviesSlice';
import contactsReducer from "./features/contactsSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    contacts: contactsReducer
  },
});

export default store;
