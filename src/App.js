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
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS
} from './store/actions';
import './common/index.css';

const mapStateToProps = state => {
  return {
    areParticipantsLoading: state.participants.isListLoading,
    participants: state.participants.list
  }
};

const mapDispatchToProps = dispatch => ({
  // async dispatcher via redux-thunk (https://github.com/gaearon/redux-thunk#composition)
  getParticipants: () => {
    console.log('test');
    dispatch({
      type: FETCH_PARTICIPANTS_REQUEST
    });

    return fetchParticipants()
      .then(resp => resp.json())
      .then(participants => dispatch({
        type: FETCH_PARTICIPANTS_SUCCESS,
        participants: participants
      }));
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
          <ParticipantList isListLoading={this.props.areParticipantsLoading} participants={this.props.participants} />
        </main>

      </div>
    );
  }
}

App.propTypes = {
  areParticipantsLoading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string
  }))
};

export default connect(mapStateToProps, mapDispatchToProps)(App);