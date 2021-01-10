import React, { useState, useEffect } from 'react'; 
import {useSelector, useDispatch} from 'react-redux'; 
import axios from 'axios';
import { selectUserInput, setBlogData } from '../app/features/userSlice';


const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const gnewsKey = process.env.REACT_APP_GNEWS_KEY;
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${gnewsKey}`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();

    useEffect(() => {
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
        <div classname="blog__page">
            <h1 className="blog__page__header">Blogs</h1>

        </div>
    )
}

export default Blogs; 
