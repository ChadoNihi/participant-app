import React from 'react';
import PropTypes from 'prop-types';

export const IconButton = ({
  children
}) => {
  return (
    <div role='button'>
      {children}
    </div>
  );
};

IconButton.propTypes = {
  children: PropTypes.element.isRequired
};

export const PrimaryButton = ({
  children
}) => {
  return (
    <button>
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.element.isRequired
};

export const SecondaryButton = ({
  children
}) => {
  return (
    <button>
      {children}
    </button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.element.isRequired
};

export default IconButton;