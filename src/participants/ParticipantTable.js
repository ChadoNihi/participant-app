import React from 'react';
import PropTypes from 'prop-types';

import ParticipantRow from './ParticipantRow';

const ParticipantTable = ({
  isListLoading,
  participants
}) => {
  return (
    <table>
      <THeader />
      <tbody>
        {participants && participants.map(participantObj => {
          return (
            <ParticipantRow
              key={participantObj.id}
              email={participantObj.email}
              isEditing={false}
              fullname={participantObj.name}
              phone={participantObj.phone}
            />
          );
        })}
      </tbody>
    </table>
  );
};

ParticipantTable.propTypes = {
  isListLoading: PropTypes.bool,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  }))
};

const THeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>E-mail address</th>
        <th>Phone number</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default ParticipantTable;