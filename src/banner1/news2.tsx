import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./banner1.css"

interface Article {
    title: string;
    description: string;
    url: string;
}

const News2 = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [displayedArticles, setDisplayedArticles] = useState(0);

    const fetchData = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=8090b74a249b4dffa71b2748fca0c37f',
            };
            const response = await axios.request(options);
            setNews(response.data.articles);
            console.log(response.data.articles);
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
        }
    };

    useEffect(() => {
        const loadDataAndSetTimeout = async () => {
            await fetchData();
        };

        loadDataAndSetTimeout(); // Spustíme načtení dat hned po zavolání useEffect

        const intervalId = setInterval(loadDataAndSetTimeout, 100 * 60 * 1000); // 100 minut v milisekundách

        return () => clearInterval(intervalId); // Zrušíme interval při odmontování komponenty
    }, []); // Zde je prázdné pole znamená, že useEffect se spustí pouze při inicializaci komponenty

    useEffect(() => {
        if (news) {
            setDisplayedArticles(Math.min(4, news.length));
        }
    }, [news, displayedArticles]); // Tento useEffect zajišťuje aktualizaci displayedArticles po načtení nových dat nebo změně displayedArticles

    return (
        <div>
            {news && news.length > 0 && news.slice(0, displayedArticles).map((article: Article, index) => (
                <div key={index} className="newstabs">
                    <div>
                    <h4><a target="_blank" rel="noopener noreferrer" href={article.url}>{article.title}</a></h4>
                    <p>{article.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News2;
