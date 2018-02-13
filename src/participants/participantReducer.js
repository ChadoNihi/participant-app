const defaultState = {
  participants: [],
  // sort: {
  //   col: 'name',
  //   isDesc: false
  // }
};

export default (state = defaultState, action) => {
  switch (action.type) {
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
