import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './Scrollab.css';

const Scrollab: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [value, setValue] = useState(0);
  const clientId = '936930992538-6pkkdh1hf45lacko0scjo0oh2gtc3jam.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const logOut = () => {
    setProfile(null);
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='contianer'>
      <br />
      <Link to="/dash">
      <img className='new-work-logo' src="/logo/new-work-logo.png" alt="Logo" />
      </Link>

      <button className="history-img-container">
        <Link to="/history">
          <img className='icon-history-img' src="/icon/icon-history.png" alt="Notification Bell" />
        </Link>
      </button>
      
      <button className="people-img-container">
        <Link to="/about">
          <img className='people-img' src="/icon/people.png" alt="About page" />
        </Link>
      </button>
      {profile && profile.imageUrl ? (
        <div>
        <button className='none-bg'>
          <Link style={{textDecoration: 'none'}} className='none-bg' to="/myprofile">
            <div className="container-profile">
              <img className='img-profile' src={profile.imageUrl} alt='user profile' />
              <div className="text-email">{profile.name}</div>
            </div>
          </Link>
        </button>
      </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="."
          onSuccess={onSuccess}
          className='btn-google'
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
      <br />

      {!profile && (
          <div className="contianer-right">
            <img className="user-icon" src="/icon/user.png" alt="User icon" />
            <h2 className="text-username">Username</h2>
          </div>
        )}
        
    </div>

  );
};

export default Scrollab;
