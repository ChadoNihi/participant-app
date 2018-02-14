import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  IconButton,
  PrimaryButton,
  SecondaryButton
} from '../common/buttons';

const ParticipantRow = ({
  deleteParticipant,
  email,
  fullname,
  isEditing,
  participantId,
  phone
}) => {
  return (
    isEditing ?
    <tr>
        <td><input type='text' value={fullname} /></td>
        <td><input type='email' value={email} /></td>
        <td><input type='text' value={phone} /></td>
        <td>
          <SecondaryButton>Cancel</SecondaryButton>
          <PrimaryButton>Save</PrimaryButton>
        </td>
      </tr> :
    <tr>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <IconButton><i className="material-icons">mode_edit</i></IconButton>
          <IconButton onClick={() => deleteParticipant(participantId)}><i className="material-icons">delete</i></IconButton>
        </td>
      </tr>
  );
};

ParticipantRow.propTypes = {
  deleteParticipant: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string,
  participantId: PropTypes.string.isRequired,
  phone: PropTypes.string
};

export default ParticipantRow;