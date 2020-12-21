import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

// export default axios.create({
//   baseURL:'https://www.googleapis.com/youtube/v3',
// })

export const fetchYTVideos = (query) => {
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

export const suggest = (term) => {
  const GOOGLE_AC_URL = `https://clients1.google.com/complete/search`;
  return axios({
    // A YT undocumented API for auto suggest search queries
    url: GOOGLE_AC_URL,
    adapter: jsonpAdapter,
    params: {
      client: 'youtube',
      hl: 'en',
      ds: 'yt',
      q: term,
    },
  }).then((res) => {
    console.log('jsonp results >> ', res);
    if (res.status !== 200) {
      throw Error('Suggest API not 200!');
    }
    return res.data[1].map((item) => item[0]);
  });
};
