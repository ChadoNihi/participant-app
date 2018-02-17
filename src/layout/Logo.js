import React from 'react';

import ThumbLogo from '../assets/thumb-logo.png';
import './Logo.css';

const Logo = (props) => {
  return (
    <a href='/' className='logo-container unstyle-link'>
      <img className='logo-img' src={ThumbLogo} alt='logo' />
      <span className='logo-txt'>Nord Software</span>
    </a>
  );
};

export default Logo;