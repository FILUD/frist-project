import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css';
import Swal from 'sweetalert2';

import FacebookLoginButton from '../components/FacebookLoginButton';
interface LoginPageProps {
  setLoggedIn: (arg0: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {

  //create from https://console.cloud.google.com/projectselector2/apis/credentials/consent?supportedpurview=project
  const clientId = '936930992538-6pkkdh1hf45lacko0scjo0oh2gtc3jam.apps.googleusercontent.com';

  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);


  //login success
  const onSuccess = async (res: any) => {
    try {
      const userData = {
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        email: res.profileObj.email,
        imageUrl: res.profileObj.imageUrl,
      };
      //get userdata to localstorage and post to API
      localStorage.setItem('userEmail', res.profileObj.email);
      const response = await axios.post('http://localhost:8080/api/login', userData);
      console.log('API response: Login', response.data);

      navigate(`/welcome?name=${encodeURIComponent(res.profileObj.name)}`);
      setLoggedIn(true);
    } catch (error) {
      console.error('API error:', error);
      setLoggedIn(false);
      Swal.fire({
        title: 'Oops, something went wrong',
        iconHtml: '<img src="/icon/db-went-worng-min.png">',
        text: 'Please try again or contact the administrator.',
        customClass: {
          icon: 'no-border'
        }
      });
    }
  };

  //set statas login if false cannot go orther pages
  const onFailure = (res: any) => {
    console.log('failed', res);
    setLoggedIn(false);
  };

  const logOut = () => {
    setProfile(null);
    setLoggedIn(false);
  };


  const [loginError, setLoginError] = useState('');

  return (
    <div className='bg-color'>
      <div className='login-container'>
        <div className='box-text'>
          <h1 className='h1-login'>Welcome</h1><br />
          <p>
            Discover Your Inner Animal: <br />
            Falcon, Bear, Rat, or Cow<br />
            Unleash Your True Personality!
          </p>
          <button className='btn-try'>Try it</button>
        </div>
      </div>
      <div className='login-form'>
        <center>
          <br /><br /><h1 className='h101-login'>Login</h1><br /><br /><br /><br />

          <GoogleLogin
            className='google-button'
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          /><br />
          <FacebookLoginButton /><br />

        </center>
        {loginError && <p style={{ color: 'white' }}>{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
