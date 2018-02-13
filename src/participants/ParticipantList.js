import React from 'react';
import PropTypes from 'prop-types';

// import ParticipantForm from './ParticipantForm';
import ParticipantTable from './ParticipantTable';

const ParticipantList = ({ isListLoading, participants}) => {
  return (
    <div>
      <h1>List of participants</h1>
      {'<ParticipantForm />'}
      <ParticipantTable isListLoading={isListLoading} participants={participants} />
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
  }))
};

export default ParticipantList;
