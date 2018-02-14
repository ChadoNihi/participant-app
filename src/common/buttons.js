import React from 'react';
import PropTypes from 'prop-types';

export const IconButton = ({
  children,
  onClick
}) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func
};

export const PrimaryButton = ({
  children,
  onClick
}) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func
};

export const SecondaryButton = ({
  children,
  disabled,
  onClick
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};