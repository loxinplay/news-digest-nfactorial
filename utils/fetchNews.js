
export const fetchNews = async (category = 'general') => {
  const res = await fetch(`/api/news?category=${category}`);
  const data = await res.json();
  return data;
};
