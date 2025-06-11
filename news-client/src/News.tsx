import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  publishDate: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined in environment variables');
        }

        const response = await fetch(`${apiUrl}/api/topic`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: NewsItem[] = await response.json();
        setNews(data);
        setLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setLoading(false);
        console.error("Fetch error:", err);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;