import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, PrimaryButton, SecondaryButton } from '../common/buttons';

const ParticipantRow = ({ email, isEditing, fullname, phone }) => {
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
      </tr>
      :
      <tr>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <IconButton><i class="material-icons">mode_edit</i></IconButton>
          <IconButton><i class="material-icons">delete</i></IconButton>
        </td>
      </tr>
    );
};

ParticipantRow.propTypes = {
  isEditing: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
};

export default ParticipantRow;
