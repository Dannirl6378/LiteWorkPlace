import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
    title: string;
    link: string;
    description: string;
}

const News1 = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [displayedArticles, setDisplayedArticles] = useState(0);

const fetchData = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://newsdata.io/api/1/news?apikey=pub_42274efc9a31e45f9bc6231a79f84c5d77fd1&language=en',
        };
        const response = await axios.request(options);
        setNews(response.data);
    } catch (error) {
        console.error('Chyba při načítání dat:', error);
    }
};

useEffect(() => {
    const loadDataAndSetTimeout = async () => {
        await fetchData();
    };

    loadDataAndSetTimeout(); 

    const intervalId = setInterval(loadDataAndSetTimeout, 100 * 60 * 1000); // 100 minut v milisekundách

    return () => clearInterval(intervalId); // Zrušíme interval při odmontování komponenty
}, []); 

useEffect(() => {
    if (news) {
        setDisplayedArticles(Math.min(3, news.length));
    }
}, [news, displayedArticles]); 


    return (
        <div>
            <h1>Latest News</h1>
            {news && news.length > 0 && news.slice(0, displayedArticles).map((article: Article, index) => (
                <div key={index}>
                    <h2><a target="_blank" rel="noopener noreferrer" href={article.link}>{article.title}</a></h2>
                    {/*<p>{article.description}</p>*/}
                </div>
            ))}
        </div>
    );
};

export default News1;
