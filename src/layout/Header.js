import React from 'react';
// import PropTypes from 'prop-types';

import Logo from './Logo';

const Header = ({children}) => (
  <header>
    <Logo />
    {children}
  </header>
)

export default Header;
