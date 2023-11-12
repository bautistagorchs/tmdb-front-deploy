// const allRequestsToAPI = [
//   {
//     url: "https://api.themoviedb.org/3/trending/movie/day",
//     setInfo: setTrendingMovies,
//   },
//   {
//     url: "https://api.themoviedb.org/3/trending/tv/day",
//     setInfo: setTrendingTvShows,
//   },
//   {
//     url: "https://api.themoviedb.org/3/tv/airing_today",
//     setInfo: setAiringToday,
//   },
//   {
//     url: "https://api.themoviedb.org/3/discover/movie?with_genres=action",
//     setInfo: setActionMovies,
//   },
//   {
//     url: "https://api.themoviedb.org/3/discover/movie?with_genres=35",
//     setInfo: setAnimationMovies,
//   },
// ];
// const requestToAPI = (url, options, setData) => {
//   axios
//     .get(url, options)
//     .then((response) => setData(response.data.results))
//     .catch((err) => console.error(err));
// };
// useEffect(() => {
//   allRequestsToAPI.map((element) =>
//     requestToAPI(element.url, options, element.setInfo)
//   );
// });
