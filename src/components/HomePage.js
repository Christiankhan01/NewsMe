import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../app/features/userSlice';

import '../styles/Home.css';


const HomePage = () => {
    const clientId = process.env.REACT_APP_BLOG_KEY;
    const dispatchEvent = useDispatch();
    const login = (response) => {
        console.log(response);
        dispatchEvent(setSignedIn(true));
        dispatchEvent(setUserData(response.profileObj));
    };

    const isSignedIn = useSelector(selectSignedIn)


    return (
        <div className="body__color">
            <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
                {!isSignedIn ? (
                    <div className="login__message">
                        <h2><span>🗞️</span></h2>
                        <h1>Today's News All in one place!</h1>
                        <p>
                            We Provide high quality online resources for reading blogs.
                            Just sign up and start reading!
                    </p>
                        <GoogleLogin
                            clientId={clientId}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="login__button">
                                    Login With Google
                                </button>
                            )}
                            onSuccess={login}
                            onFailure={login}
                            isSignedIn={true}
                            cookiePolicy={"single_host_origin"}

                        />
                    </div>
                ) : (
                        ""
                    )}
            </div>
        </div> 
    );
};

export default HomePage; 
