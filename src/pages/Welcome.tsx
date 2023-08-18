import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Welcome.css';

function Welcome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  useEffect(() => {
    const hasReloaded = localStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div className='body-welcome'>
      <div className='container-welcome'>
        <div className='text-welcome'><strong>Welcome, <br/>{name}</strong></div><br />

        <p className='tag-p-home'><strong>Discover Your Inner Animal:<br /> 
        Falcon, Bear, Rat, or Cow <br />
        Unleash Your True Personality!</strong></p><br/>

        <button className='button-start'>
          <Link style={{textDecoration: 'none'}} to='/dash'>
            <p className='text-btn-start'>Let's get started</p>
          </Link>
        </button>

      </div>
      <img className='img-welcome' src='bg/home.png' alt="Welcome"></img>
    </div>
  );
}

export default Welcome;
