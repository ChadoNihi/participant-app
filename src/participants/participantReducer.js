import {
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
  console.log(action.type);
  switch (action.type) {
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