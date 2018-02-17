import {
  ADD_PARTICIPANT_SUCCESS,
  DEL_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  UPDATE_PARTICIPANT_SUCCESS
} from '../store/actions';
import {
  genUuidv4
} from './helpers';

const defaultState = {
  isListLoading: false,
  list: []
};

export default (state = defaultState, action) => {
  let i;
  switch (action.type) {
    case ADD_PARTICIPANT_SUCCESS:
      return {
        ...state,
        list: [{
            ...action.participantSansId,
            id: genUuidv4()
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