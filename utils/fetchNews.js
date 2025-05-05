import axios from 'axios';

const API_URL = 'https://newsapi.org/v2/top-headlines';

export async function fetchNews(category = 'general') {
  const res = await axios.get(API_URL, {
    params: {
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY, 
      language: 'en',
      country: 'us', 
      category: category, 
      pageSize: 20, 
    },
  });
  return res.data.articles; 
}
