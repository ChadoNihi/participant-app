import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

// import ParticipantForm from './ParticipantForm';
import ParticipantTable from './ParticipantTable';

const ParticipantList = ({
  isListLoading,
  participants,
  ...otherProps
}) => {
  return (
    <div>
      <h1>List of participants <FontAwesomeIcon icon={faSpinner} spin {...(isListLoading || {className: 'hidden'})} /></h1>
      {'<ParticipantForm />'}
      <ParticipantTable {...otherProps} participants={participants} />
    </div>
  );
};

ParticipantList.propTypes = {
  isListLoading: PropTypes.bool,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  })),
  otherProps: PropTypes.object
};

export default ParticipantList;