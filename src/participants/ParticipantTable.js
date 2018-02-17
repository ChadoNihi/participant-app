import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

import {
  compareParticipants
} from './helpers';
import ParticipantRow from './ParticipantRow';

class ParticipantTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: 'name',
      isDesc: {
        email: false,
        name: false,
        phone: false
      }
    };

    this.onColumnHeaderClick = this.onColumnHeaderClick.bind(this);
  }

  onColumnHeaderClick(col) {
    this.setState(prevState => ({
      sortColumn: col,
      isDesc: {
        ...prevState.isDesc,
        // column toggled or switched to?
        [col]: (col === prevState.sortColumn ? !prevState.isDesc[col] : prevState.isDesc[col])
      }
    }));
  }

  render() {
    const {
      participants,
      ...otherProps
    } = this.props;
    const sortedParticipants = (
      this.state.sortColumn ?
      participants.slice().sort((a, b) => compareParticipants(this.state.sortColumn, a, b, this.state.isDesc[this.state.sortColumn])) :
      participants);

    return (
      <table className='participant-table'>
        <THeader
          columns={[
            ['name', 'Name*'],
            ['email', 'E-mail address'],
            ['phone', 'Phone number']
          ]}
          currentSortColumn={this.state.sortColumn}
          isDesc={this.state.sortColumn && this.state.isDesc[this.state.sortColumn]}
          onColumnHeaderClick={this.onColumnHeaderClick}
        />
        <tbody>
          {sortedParticipants.map(participantObj => {
            return (
              <ParticipantRow
                {...otherProps}
                key={participantObj.id}
                email={participantObj.email}
                fullname={participantObj.name}
                participantId={participantObj.id}
                phone={participantObj.phone}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

ParticipantTable.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string
  }))
};

const THeader = ({
  columns,
  currentSortColumn,
  isDesc,
  onColumnHeaderClick,
}) => {
  const columnHeaders = columns.map(([field, displayName]) => THeader.makeColumnHeader({
    field,
    displayName,
    currentSortColumn,
    isDesc,
    onColumnHeaderClick
  }));

  return (
    <thead>
      <tr className='participant-head-row'>
        {columnHeaders}
        <th className='btns-col-sz'></th>
      </tr>
    </thead>
  );
};

THeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ).isRequired,
  currentSortColumn: PropTypes.string,
  isDesc: PropTypes.bool,
  onColumnHeaderClick: PropTypes.func.isRequired
};

THeader.makeColumnHeader = ({
  field,
  displayName,
  currentSortColumn,
  isDesc,
  onColumnHeaderClick
}) => (
  <th key={field} className={`participant-cell ${field}-col-sz`}>
    <button
      className={`txt-toggle${currentSortColumn === field ? ' active' : ''}`}
      onClick={() => onColumnHeaderClick(field)}
      aria-label={currentSortColumn ? (`Sort participants by ${displayName.toLowerCase()}, ${isDesc ? 'ascended' : 'descended'}`) : `Sort by ${displayName.toLowerCase()}`}
    >
      {displayName} {currentSortColumn === field && <i className="material-icons txt-toggle-icon" aria-hidden="true">{`arrow_${isDesc ? 'upward' : 'downward'}`}</i>}
    </button>
  </th>
);

export default ParticipantTable;