import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectUserInput, setNewsData } from '../app/features/userSlice';
import '../styles/Blogs.css';


const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState();

    useEffect(() => {
        const gnewsKey = process.env.REACT_APP_GNEWS_KEY;
        const news_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${gnewsKey}&lang=en`;
        axios.get(news_url).then((response) => {
                dispatch(setNewsData(response.data))
                setNews(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput]);

    
    return (
        <div className="container">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="blog__page body__color">
                        <h1 className="blog__page__header">News</h1>
                        { loading ? <h1 className="loading">Loading...</h1> : "" }
                        <div className="blogs">
                            { news?.articles?.map((story, id) => (
                                <a key={id} className="blog" target="_blank" rel="noreferrer" href={ story.url }>
                                    <img src={ story.image } alt="newsImg" />
                                    <div>
                                        <h3 className="sourceName">
                                            <span>{ story.source.name }</span>
                                            <p>{ story.publishedAt }</p>
                                        </h3>
                                        <h1>{ story.title }</h1>
                                        <p>{ story.description }</p>
                                    </div>
                                </a>
                            )) }
                            { news?.totalArticles === 0 && (
                                <h1 className="no__blogs">
                                    No news available for you search term.
                                </h1>
                            ) }
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Blogs; 
