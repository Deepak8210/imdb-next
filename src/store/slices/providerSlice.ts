import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define error type
interface ErrorResponse {
  message: string;
}

interface ProviderState {
  banners: {
    data: [] | null;
    loading: boolean;
    error: string | null;
  };
  trending: {
    data: [] | null;
    loading: boolean;
    error: string | null;
  };
  popular: {
    data: [] | null;
    loading: boolean;
    error: string | null;
  };
  topRated: {
    data: [] | null;
    loading: boolean;
    error: string | null;
  };
}

const tmdbBaseUrl = "https://api.themoviedb.org/3";
const token = process.env.NEXT_PUBLIC_IMDB_TOKEN;

// Async thunk to fetch posts
export const fetchBanner = createAsyncThunk<
  [],
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
  [],
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

// Async thunk to fetch popular
export const fetchPopular = createAsyncThunk<
  [],
  void,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchPopular", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + "/movie/popular", {
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

// Async thunk to fetch top rated
export const fetchTopRated = createAsyncThunk<
  [],
  void,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchTopRated", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + "/movie/top_rated", {
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
  popular: { data: null, loading: false, error: null },
  topRated: { data: null, loading: false, error: null },
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
      })
      .addCase(fetchPopular.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.data = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.payload?.message ?? "An error occurred";
      })
      .addCase(fetchTopRated.pending, (state) => {
        state.topRated.loading = true;
        state.topRated.error = null;
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.topRated.loading = false;
        state.topRated.data = action.payload;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.payload?.message ?? "An error occurred";
      });
  },
});

export const providerReducer = providerSlice.reducer;
