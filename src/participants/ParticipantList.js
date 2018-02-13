import React from 'react';
import PropTypes from 'prop-types';

const ParticipantList = (props) => {
  return (
    <div>
      <h1>List of participants</h1>
      
    </div>
  );
};

ParticipantList.propTypes = {
  areParticipantsLoading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  }))
};

export default ParticipantList;
