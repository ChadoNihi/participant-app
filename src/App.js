import React from 'react';
import PropTypes from 'prop-types';

import ParticipantList from './participants/ParticipantList';

const mapStateToProps = state => {
  return {
    areParticipantsLoading: state.areParticipantsLoading,
    participants: state.participants
}};

const mapDispatchToProps = dispatch => ({
  // async dispatcher via redux-thunk (https://github.com/gaearon/redux-thunk#composition)
  getParticipants: () => dispatch => {
    dispatch({
      type: FETCH_PARTICIPANTS_REQUEST
    })

    return fetchParticipants()
      .then(resp => resp.json())
      .then(json => dispatch({
        type: FETCH_PARTICIPANTS_SUCCESS,
        payload: JSON.parse(json)
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
          <ParticipantList areParticipantsLoading={this.props.areParticipantsLoading} participants={this.props.participants} />
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
