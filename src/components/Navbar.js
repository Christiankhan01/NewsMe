import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { selectUserData, selectSignedIn, setInput, setSignedIn, setUserData } from '../app/features/userSlice';
import '../styles/Navbar.css';


const Navbar1 = () => {
    const [inputValue, setInputValue] = useState("tech");
    const clientId = process.env.REACT_APP_BLOG_KEY;
    const userData = useSelector(selectUserData);
    const isSignedIn = useSelector(selectSignedIn);
    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(setInput(inputValue));
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
    }
    return (

        <div className="navbar">
            <h1 className="navbar__header">NewsMe 📰</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input
                        type="text"
                        className="search"
                        placeholder="Enter search here"
                        value={ inputValue }
                        onChange={ (e) => setInputValue(e.target.value) }
                        onKeyPress={ handleKeyPress }
                        onFocus = { (e) => setInputValue("")}

                    />
                    <button className="submit" onClick={ handleClick } >
                        Go
                  </button>
                </div>
            ) }

            { isSignedIn ? (<div className="navbar__user__data">
                <Avatar className="user" src={ userData?.imageUrl } alt={ userData?.name } />
                <h1 className="signedIn">{ userData?.givenName }</h1>
                <GoogleLogout
                    clientId={ clientId }
                    render={ (renderProps) => (
                        <button
                            onClick={ renderProps.onClick }
                            disabled={ renderProps.disabled }
                            className="logout__button">
                            Logout 👋
                        </button>
                    ) }
                    onLogoutSuccess={ logout }
                />
            </div>
            ) : (
                    <h1 className="notSignedIn">User Not Available</h1>
                ) }
        </div>
    );
};

export default Navbar1;


