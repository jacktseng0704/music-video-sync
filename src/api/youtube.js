import axios from 'axios';

// export default axios.create({
//   baseURL:'https://www.googleapis.com/youtube/v3',
// })

export const loadYTVideos = (query) => {
  console.log('Loading YT Videos');

  const YT_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`;
  return axios({
    // A YT undocumented API for auto suggest search queries
    url: YT_SEARCH_URL,
    params: {
      type: 'video',
      part: 'snippet',
      maxResults: '50',
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: query,
    },
  });
};
