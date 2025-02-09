import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the arguments
interface FetchDetailsArgs {
  filterType: string;
  movieId: string;
}

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
    mediaType?: string;
  };
  topRated: {
    data: [] | null;
    loading: boolean;
    error: string | null;
    mediaType?: string;
  };
  movieDetails: {
    loading: boolean;
    error: string | null;
    details: any;
    credits: any;
  };
  similarVideos: {
    loading: boolean;
    error: string | null;
    videos: any;
    similar: any;
    recommendation: any;
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

// Async thunk to fetch trendings
export const fetchTrending = createAsyncThunk<
  [],
  string,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchTrendings", async (label, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + `/trending/all/${label}`, {
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
  { data: any; mediaType: string },
  string,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchPopular", async (mediaType, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(tmdbBaseUrl + `/${mediaType}/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data, mediaType };
  } catch (error) {
    return rejectWithValue({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

// Async thunk to fetch top rated
export const fetchTopRated = createAsyncThunk<
  { data: any; mediaType: string },
  string,
  {
    rejectValue: ErrorResponse;
  }
>("provider/fetchTopRated", async (mediaType, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      tmdbBaseUrl + `/${mediaType === "tvs" ? "tv" : "movie"}/top_rated`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data, mediaType };
  } catch (error) {
    return rejectWithValue({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

// Async thunk to fetch movie details
export const fetchDetails = createAsyncThunk<
  { details: any; credits: any }, // Update the return type to match the actual return value
  FetchDetailsArgs, // Argument type
  {
    rejectValue: ErrorResponse;
  }
>(
  "provider/fetchDetails",
  async ({ filterType, movieId }, { rejectWithValue }) => {
    try {
      // Define both API calls
      const api1 = axios.get(
        tmdbBaseUrl + `/${filterType}/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const api2 = axios.get(
        tmdbBaseUrl + `/${filterType}/${movieId}/credits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Use Promise.all to call both APIs concurrently
      const [response1, response2] = await Promise.all([api1, api2]);

      // Return both responses
      return {
        details: response1.data,
        credits: response2.data,
      };
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
);

// Async thunk to fetch similar/recommended  movies/videos
export const fetchSimilarVideos = createAsyncThunk<
  { videos: any; similar: any; recommendation: any }, // Update the return type to match the actual return value
  FetchDetailsArgs, // Argument type
  {
    rejectValue: ErrorResponse;
  }
>(
  "provider/fetchSimilarVideos",
  async ({ filterType, movieId }, { rejectWithValue }) => {
    try {
      // Define both API calls
      const api1 = axios.get(tmdbBaseUrl + `/${filterType}/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const api2 = axios.get(
        tmdbBaseUrl + `/${filterType}/${movieId}/similar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const api3 = axios.get(
        tmdbBaseUrl + `/${filterType}/${movieId}/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Use Promise.all to call both APIs concurrently
      const [response1, response2, response3] = await Promise.all([
        api1,
        api2,
        api3,
      ]);

      // Return both responses
      return {
        videos: response1.data,
        similar: response2.data,
        recommendation: response3.data,
      };
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }
);

// Initial state
const initialState: ProviderState = {
  banners: { data: null, loading: false, error: null },
  trending: { data: null, loading: false, error: null },
  popular: { data: null, loading: false, error: null },
  topRated: { data: null, loading: false, error: null, mediaType: "" },
  movieDetails: { details: null, credits: null, loading: false, error: null },
  similarVideos: {
    videos: null,
    similar: null,
    recommendation: null,
    loading: false,
    error: null,
  },
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
        state.popular.data = action.payload.data;
        state.popular.mediaType = action.payload.mediaType;
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
        state.topRated.data = action.payload.data;
        state.popular.mediaType = action.payload.mediaType;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.payload?.message ?? "An error occurred";
      })
      .addCase(fetchDetails.pending, (state) => {
        state.movieDetails.loading = true;
        state.movieDetails.error = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.movieDetails.loading = false;
        // Update state with details and credits separately
        state.movieDetails.details = action.payload.details; // Store movie details
        state.movieDetails.credits = action.payload.credits; // Store movie credits
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.movieDetails.loading = false;
        state.movieDetails.error =
          action.payload?.message ?? "An error occurred";
      })
      .addCase(fetchSimilarVideos.pending, (state) => {
        state.similarVideos.loading = true;
        state.similarVideos.error = null;
      })
      .addCase(fetchSimilarVideos.fulfilled, (state, action) => {
        state.similarVideos.loading = false;
        // Update state with details and credits separately
        state.similarVideos.videos = action.payload.videos; // Store movie details
        state.similarVideos.similar = action.payload.similar; // Store movie credits
        state.similarVideos.recommendation = action.payload.recommendation; // Store movie credits
      })
      .addCase(fetchSimilarVideos.rejected, (state, action) => {
        state.similarVideos.loading = false;
        state.similarVideos.error =
          action.payload?.message ?? "An error occurred";
      });
  },
});

export const providerReducer = providerSlice.reducer;
