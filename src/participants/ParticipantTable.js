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
      sortColumn: null,
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
      <table>
        <THeader
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
  currentSortColumn,
  isDesc,
  onColumnHeaderClick,
}) => {
  // TODO: dry; what if isDesc is undefined
  return (
    <thead>
      <tr>
        <th>
          <button onClick={() => onColumnHeaderClick('name')} aria-label={currentSortColumn ? (`Sort participants by name, ${isDesc ? 'ascended' : 'descended'}`) : 'Sort by name'}>
            Name* {currentSortColumn === 'name' && <i className="material-icons" aria-hidden="true">{`arrow_${isDesc ? 'upward' : 'downward'}`}</i>}
          </button>
        </th>
        <th>
          <button onClick={() => onColumnHeaderClick('email')} aria-label={currentSortColumn ? (`Sort participants by email, ${isDesc ? 'ascended' : 'descended'}`) : 'Sort by email'}>
            E-mail address {currentSortColumn === 'email' && <i className="material-icons" aria-hidden="true">{`arrow_${isDesc ? 'upward' : 'downward'}`}</i>}
          </button>
        </th>
        <th>
          <button onClick={() => onColumnHeaderClick('phone')} aria-label={currentSortColumn ? (`Sort participants by phone, ${isDesc ? 'ascended' : 'descended'}`) : 'Sort by phone'}>
            Phone number {currentSortColumn === 'phone' && <i className="material-icons" aria-hidden="true">{`arrow_${isDesc ? 'upward' : 'downward'}`}</i>}
          </button>
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

THeader.propTypes = {
  currentSortColumn: PropTypes.string,
  isDesc: PropTypes.bool,
  onColumnHeaderClick: PropTypes.func.isRequired
};

export default ParticipantTable;