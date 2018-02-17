import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

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
    this.onFieldChange = this.onFieldChange.bind(this);
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

  onFieldChange(k, val) {
    this.setState(prevState => {
      return {
        editingState: Object.assign({}, prevState.editingState, {
          [k]: val
        })
      };
    });
  }

  onSave() {
    const participant = validatePaticipant(this.state.editingState);
    if (participant) {
      this.props.updateParticipant(this.props.participantId, participant);

      this.setState(() => ({
        editingState: null
      }));
    }
  }

  render() {
    return (
      this.state.editingState ?
      <tr className='participant-form participant-row'>
          <td className='participant-cell'>
            <input type='text'
              value={this.state.editingState.name || ''}
              placeholder='Full name*'
              onChange={ev => this.onFieldChange('name', ev.target.value)}
              onKeyPress={ev => ev.key === 'Enter' && this.onSave()} />
          </td>
          <td className='participant-cell'>
            <input type='email'
              value={this.state.editingState.email || ''}
              placeholder='E-mail address'
              onChange={ev => this.onFieldChange('email', ev.target.value)}
              onKeyPress={ev => ev.key === 'Enter' && this.onSave()} />
          </td>
          <td className='participant-cell'>
            <input type='text'
              value={this.state.editingState.phone || ''}
              placeholder='Phone number'
              onChange={ev => this.onFieldChange('phone', ev.target.value)}
              onKeyPress={ev => ev.key === 'Enter' && this.onSave()} />
          </td>
          <td className='participant-cell'>
            <SecondaryButton onClick={this.cancelEditing}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={this.onSave}>
              Save
            </PrimaryButton>
          </td>
        </tr> :
      <tr  className='participant-row'>
          <td className='participant-cell'>{this.props.fullname}</td>
          <td className='participant-cell'>{this.props.email}</td>
          <td className='participant-cell'>{this.props.phone}</td>
          <td className='participant-cell'>
            <IconButton aria-label={'Edit'} onClick={this.enableEditing}>
              <i className="material-icons" aria-hidden="true">mode_edit</i>
            </IconButton>
            <IconButton aria-label={'Delete'} onClick={() => this.props.deleteParticipant(this.props.participantId)}>
              <i className="material-icons" aria-hidden="true">delete</i>
            </IconButton>
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