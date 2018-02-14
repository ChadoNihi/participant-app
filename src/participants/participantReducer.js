import {
  DEL_PARTICIPANT_SUCCESS,
  ENABLE_EDITING,
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS
} from '../store/actions';

const defaultState = {
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

    case ENABLE_EDITING:
      const newList = state.list.slice();

      i = state.list.findIndex(participantObj => participantObj.id === action.id);
      newList[i] = Object.assign({}, newList[i], {
        isEditingOn: true
      });

      return {
        ...state,
        list: newList
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

      // case SORT_TOGGLE:
      //   return {
      //     ...state,
      //     sort: {
      //       state
      //     }
      //   };

    default:
      return state;
  }
};