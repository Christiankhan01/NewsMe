import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../app/features/userSlice';

import './styles/Home.css';


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
            <div className="home__page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="">
                                {!isSignedIn ? (

                                    <div className="login__message ">
                                        <div className="paper">
                                            <h2><span>🗞️</span></h2>
                                        </div>
                                        <h1>Top 10  </h1>
                                        <h1 className="">News Articles</h1>
                                        <p className="p__home">
                                            An online resource for reading the news.
                                            <br/>
                                            Just login with google and start reading! No signup necessary!
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
                    </div>
                </div>
            </div>
        </div>


    );
};

export default HomePage; 
