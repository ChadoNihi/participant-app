import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import PropTypes from 'prop-types';

import Header from './layout/Header';
import {
  fetchParticipants
} from './participants/api';
import ParticipantList from './participants/ParticipantList';
import {
  DEL_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  UPDATE_PARTICIPANT_SUCCESS
} from './store/actions';
import './common/index.css';

const mapStateToProps = state => {
  return {
    areParticipantsLoading: state.participants.isListLoading,
    participantId2EditingState: state.participants.id2EditingState,
    participants: state.participants.list
  }
};

const mapDispatchToProps = dispatch => ({
  // async dispatcher via redux-thunk (https://github.com/gaearon/redux-thunk#composition)
  getParticipants: () => {
    dispatch({
      type: FETCH_PARTICIPANTS_REQUEST
    });

    return fetchParticipants()
      .then(resp => resp.json())
      .then(participants => dispatch({
        type: FETCH_PARTICIPANTS_SUCCESS,
        participants
      }));
  },

  deleteParticipant: id => {
    dispatch({
      type: DEL_PARTICIPANT_SUCCESS,
      id
    });
  },

  updateParticipant: (id, participant) => {
    dispatch({
      type: UPDATE_PARTICIPANT_SUCCESS,
      id,
      participant
    });
  }
});

class App extends Component {
  componentDidMount() {
    this.props.getParticipants();
  }

  render() {
    return (
      <div>
        <Header />

        <main>
          <ParticipantList
            deleteParticipant={this.props.deleteParticipant}
            isListLoading={this.props.areParticipantsLoading}
            participants={this.props.participants}
            updateParticipant={this.props.updateParticipant}
          />
        </main>

      </div>
    );
  }
}

App.propTypes = {
  areParticipantsLoading: PropTypes.bool.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  })),
  updateParticipant: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);