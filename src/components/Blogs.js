import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectUserInput, setBlogData } from '../app/features/userSlice';
import '../styles/Blogs.css';


const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const gnewsKey = process.env.REACT_APP_GNEWS_KEY;
        const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${gnewsKey}`;
        axios
            .get(blog_url)
            .then((response) => {
                dispatch(setBlogData(response.data))
                setBlogs(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput])

    const [loading, setLoading] = useState(true);
    return (
        <div className="col">
            <div className="blog__page body__color">
                <h1 className="blog__page__header">Blogs</h1>
                {loading ? <h1 className="loading">Loading...</h1> : ""}
                <div className="blogs">
                    {blogs?.articles?.map(blog => (
                        <a className="blog" target="_blank" rel="noreferrer" href={blog.url}>
                            <img src={blog.image} alt="newsImg" />
                            <div>
                                <h3 className="sourceName">
                                    <span>{blog.source.name}</span>
                                    <p>{blog.publishedAt}</p>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>
                    ))}
                    {blogs?.totalArticles === 0 && (
                        <h1 className="no__blogs">
                            No news available for you search term.
                        </h1>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Blogs; 
