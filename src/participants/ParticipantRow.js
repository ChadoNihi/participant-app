import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
  IconButton,
  PrimaryButton,
  SecondaryButton
} from '../common/buttons';
import {
  validatePaticipant
} from './helpers';

class ParticipantRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingState: null
    };

    this.cancelEditing = this.cancelEditing.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.onRowFieldChange = this.onRowFieldChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  cancelEditing() {
    this.setState(() => ({
      editingState: null
    }));
  }

  enableEditing() {
    this.setState(() => ({
      editingState: {
        email: this.props.email,
        name: this.props.fullname,
        phone: this.props.phone
      }
    }));
  }

  onRowFieldChange(col, val) {
    this.setState(prevState => {
      return {
        editingState: Object.assign({}, prevState.editingState, {
          [col]: val
        })
      };
    });
  }

  onSave() {
    const participant = validatePaticipant(this.state.editingState);
    if (participant) {
      this.props.updateParticipant(participantId, participant);

      this.setState(() => ({
        editingState: null
      }));
    }
  }

  render() {
    return (
      this.state.editingState ?
      <tr>
          <td>
            <input type='text'
              value={this.state.editingState.name || ''}
              onChange={(ev) => this.onRowFieldChange('name', ev.target.value)} />
          </td>
          <td>
            <input type='email'
              value={this.state.editingState.email || ''}
              onChange={(ev) => this.onRowFieldChange('email', ev.target.value)} />
          </td>
          <td>
            <input type='text'
              value={this.state.editingState.phone || ''}
              onChange={(ev) => this.onRowFieldChange('phone', ev.target.value)} />
          </td>
          <td>
            <SecondaryButton onClick={this.cancelEditing}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={this.onSave}>
              Save
            </PrimaryButton>
          </td>
        </tr> :
      <tr>
          <td>{this.props.fullname}</td>
          <td>{this.props.email}</td>
          <td>{this.props.phone}</td>
          <td>
            <IconButton onClick={this.enableEditing}><i className="material-icons">mode_edit</i></IconButton>
            <IconButton onClick={() => this.props.deleteParticipant(this.props.participantId)}><i className="material-icons">delete</i></IconButton>
          </td>
        </tr>
    );
  }
}

ParticipantRow.propTypes = {
  deleteParticipant: PropTypes.func.isRequired,
  email: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  participantId: PropTypes.string.isRequired,
  phone: PropTypes.string,
  updateParticipant: PropTypes.func.isRequired
};

export default ParticipantRow;