import {
  ADD_PARTICIPANT_SUCCESS,
  DEL_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  UPDATE_PARTICIPANT_SUCCESS
} from '../store/actions';

const defaultState = {
  // id2EditingState: {},
  isListLoading: false,
  list: [],
  // sort: {
  //   col: 'name',
  //   isDesc: false
  // }
};

export default (state = defaultState, action) => {
  let i;
  switch (action.type) {
    case ADD_PARTICIPANT_SUCCESS:
      const id = (
        // == (current max id) + 1
        state.list.reduce((maxId, participant) => Math.max(maxId, participant.id), 0) + 1
      ).toString();

      return {
        ...state,
        list: [{
            ...action.participantSansId,
            id
          },
          ...state.list,
        ]
      };

    case DEL_PARTICIPANT_SUCCESS:
      i = state.list.findIndex(participantObj => participantObj.id === action.id);
      // works with i = -1 (not found) too
      return {
        ...state,
        list: [
          ...state.list.slice(0, i),
          ...state.list.slice(i + 1)
        ]
      };

    case FETCH_PARTICIPANTS_REQUEST:
      return {
        ...state,
        isListLoading: true
      };

    case FETCH_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        isListLoading: false,
        list: action.participants
      };

    case UPDATE_PARTICIPANT_SUCCESS:
      const newList = state.list.slice();

      i = state.list.findIndex(participantObj => participantObj.id === action.id);

      newList[i] = Object.assign({}, newList[i], action.participant);

      return {
        ...state,
        list: newList
      };

    default:
      return state;
  }
};