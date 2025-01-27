import React, { useEffect, useState } from "react";
import axios from "axios";
import "./banner1.css"; // Styl
import { getNews } from "../dbData/AxiosGetNews";

interface Article {
  title: string;
  url: string;
}

const News2: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        if (data && !data.error && Array.isArray(data.articles)) {
          setNews(data.articles); // Očekáváme, že backend vrací `articles`
        } else {
          console.error("Error fetching news or invalid data structure");
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };

    fetchNews();

    const intervalId = setInterval(fetchNews, 100 * 60 * 1000); // Aktualizace po 100 minutách
    return () => clearInterval(intervalId);
    
  }, []); // Only fetch on mount


  return (
    <div className="scrolling-cylinder">
      <div className="scrolling-content">
        {[...news, ...news].map((article, index) => (
          <div key={index} className="news-item">
            <div className="bullet"></div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News2;
