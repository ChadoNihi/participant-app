import React, {
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

import ParticipantForm from './ParticipantForm';
import ParticipantTable from './ParticipantTable';
import './index.css';

const ParticipantList = ({
  addParticipant,
  isListLoading,
  participants,
  ...otherProps
}) => {
  return (
    <Fragment>
      <h1 className='title'>List of participants <FontAwesomeIcon icon={faSpinner} spin {...(isListLoading || {className: 'hidden'})} /></h1>
      <ParticipantForm submitParticipant={addParticipant} />
      <ParticipantTable {...otherProps} participants={participants} />
    </Fragment>
  );
};

ParticipantList.propTypes = {
  addParticipant: PropTypes.func.isRequired,
  isListLoading: PropTypes.bool,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string
  }))
};

export default ParticipantList;