import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

import {
  PrimaryButton
} from '../common/buttons';
import {
  validatePaticipant
} from './helpers';

class ParticipantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      phone: ''
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(k, val) {
    this.setState(prevState => ({
      ...prevState,
      [k]: val
    }));
  }

  onSubmit(ev) {
    const participant = validatePaticipant(this.state);

    ev.preventDefault();

    if (participant) {
      this.props.submitParticipant(participant);

      this.setState(prevState => ({
        email: '',
        name: '',
        phone: ''
      }));
    }
  }

  render() {
    return (
      <form className='participant-form  participant-row' onSubmit={this.onSubmit}>
        <div className='participant-cell'>
          <input type='text'
          value={this.state.name || ''}
          placeholder='Full name*'
          onChange={ev => this.onFieldChange('name', ev.target.value)}
          required
          />
        </div>
        <div className='participant-cell email-col-sz'>
          <input type='email'
          value={this.state.email || ''}
          placeholder='E-mail address'
          onChange={ev => this.onFieldChange('email', ev.target.value)}
          />
        </div>
        <div className='participant-cell phone-col-sz'>
          <input type='text'
          value={this.state.phone || ''}
          placeholder='Phone number'
          onChange={ev => this.onFieldChange('phone', ev.target.value)}
          />
        </div>
        <div className='participant-cell btns-col-sz'>
          <PrimaryButton type='submit' disabled={this.state.name.trim().length === 0}>
            Add new
          </PrimaryButton>
        </div>
      </form>
    );
  }
}

ParticipantForm.propTypes = {
  submitParticipant: PropTypes.func.isRequired
};

export default ParticipantForm;