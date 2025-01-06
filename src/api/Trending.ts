import axios from "axios";
export async function fetchTrending() {
  const token = process.env.NEXT_PUBLIC_IMDB_TOKEN;
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/all/day", //for other banner - /movies/upcoming
    {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token in the Authorization header
      },
    }
  );

  return data;
}
