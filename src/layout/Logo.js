import React from 'react';

import ThumbLogo from '../assets/thumb-logo.png';

const Logo = (props) => {
  return (
    <a href='#'>
      <img src={ThumbLogo} alt='logo' />
      <span>Nord Software</span>
    </a>
  );
};

export default Logo;
