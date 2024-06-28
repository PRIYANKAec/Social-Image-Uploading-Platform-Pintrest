import React, { useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { gapi } from "gapi-script";
import { client } from "../client";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //initiates Google Oauth setup
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "profile",
      });
    });
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));
    const { given_name, sub, picture } = response;
    const doc = {
      _id: sub,
      _type: "user",
      userName: given_name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              onSuccess={credentialResponse => {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  )
                console.log(credentialResponseDecoded);
                responseGoogle(credentialResponseDecoded);
                }}
              onFailure={() => {
                console.log('Login Failed');
              }}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;