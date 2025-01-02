import React, { useEffect, useState } from "react";
import axios from "axios";
import "./banner1.css"; // Styl

interface Article {
  title: string;
  url: string;
}

const News2: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=8090b74a249b4dffa71b2748fca0c37f",
      };
      const response = await axios.request(options);
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 100 * 60 * 1000); // Aktualizace po 100 minutách
    return () => clearInterval(intervalId); // Vyčistíme interval při odmontování komponenty
  }, []);

  return (
    <div className="scrolling-cylinder">
      <div className="scrolling-content">
        {news.slice(0, 10).map((article, index) => (
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
