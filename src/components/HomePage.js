import React from 'react'
import GoogleLogin from 'react-google-login';
require('dotenv').config(); 

const clientId = process.env.REACT_APP_BLOG_KEY; 

const HomePage = () => {
    const login = (response) => {
        console.log(response); 
    }
    return (
        <div>
            <div className="home__page">
                <div className="login__message">
                    <h2>Book</h2>
                    <h1>A reader's favorite place!</h1>
                    <p>
                        We Provide high quality online resources for reading blogs.
                        Just sign up and start reading!
                    </p>
                    <GoogleLogin
                        clientId = {clientId}
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
            </div>
        </div>
    )
}

export default HomePage; 
