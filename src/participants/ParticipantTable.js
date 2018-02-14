import React from 'react';
import PropTypes from 'prop-types';

import ParticipantRow from './ParticipantRow';

const ParticipantTable = ({
  participants,
  ...otherProps
}) => {
  return (
    <table>
      <THeader />
      <tbody>
        {participants.map(participantObj => {
          return (
            <ParticipantRow
              {...otherProps}
              key={participantObj.id}
              email={participantObj.email}
              fullname={participantObj.name}
              isEditing={false}
              participantId={participantObj.id}
              phone={participantObj.phone}
            />
          );
        })}
      </tbody>
    </table>
  );
};

ParticipantTable.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  })),
  otherProps: PropTypes.object
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