import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interfaces for the API response
interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Define error type
interface ErrorResponse {
  message: string;
}

interface ProviderState {
  banners: {
    data: Post[] | null;
    loading: boolean;
    error: string | null; // Keep as string since we'll extract error message
  };
  trending: {
    data: User[] | null;
    loading: boolean;
    error: string | null;
  };
}

const tmdbBaseUrl = "https://api.themoviedb.org/3";
const token = process.env.NEXT_PUBLIC_IMDB_TOKEN;

// Async thunk to fetch posts
export const fetchBanner = createAsyncThunk<
  Post[],
  void,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + "/movie/upcoming", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

// Async thunk to fetch users
export const fetchTrending = createAsyncThunk<
  User[],
  void,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + "/trending/all/day", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return rejectWithValue({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

// Initial state
const initialState: ProviderState = {
  banners: { data: null, loading: false, error: null },
  trending: { data: null, loading: false, error: null },
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.banners.loading = true;
        state.banners.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banners.loading = false;
        state.banners.data = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.banners.loading = false;
        state.banners.error = action.payload?.message ?? "An error occurred";
      })
      .addCase(fetchTrending.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending.loading = false;
        state.trending.data = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload?.message ?? "An error occurred";
      });
  },
});

export const providerReducer = providerSlice.reducer;
