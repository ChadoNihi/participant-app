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

    console.log('onSubmit');

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
      <form onSubmit={this.onSubmit}>
        <input type='text'
          value={this.state.name || ''}
          placeholder={'Full name'}
          onChange={ev => this.onFieldChange('name', ev.target.value)}
          required
        />
        <input type='email'
          value={this.state.email || ''}
          placeholder={'E-mail address'}
          onChange={ev => this.onFieldChange('email', ev.target.value)}
        />
        <input type='text'
          value={this.state.phone || ''}
          placeholder={'Phone number'}
          onChange={ev => this.onFieldChange('phone', ev.target.value)}
        />
        <PrimaryButton type='submit' disabled={false}>
          Add new
        </PrimaryButton>
      </form>
    );
  }
}

ParticipantForm.propTypes = {
  submitParticipant: PropTypes.func.isRequired
};

export default ParticipantForm;