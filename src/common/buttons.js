import React from 'react';
import PropTypes from 'prop-types';

import './buttons.css';

export const IconButton = ({
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <button {...otherProps} className='icon-btn' onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export const PrimaryButton = ({
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <button {...otherProps} className='rect-btn primary' onClick={onClick}>
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export const SecondaryButton = ({
  children,
  disabled,
  onClick,
  ...otherProps
}) => {
  return (
    <button {...otherProps} className='rect-btn' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};