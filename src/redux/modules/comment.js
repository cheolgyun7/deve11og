//Action Value
const SET_COMMENT = 'comment/SET_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';

//Action Creator
export const setComment = (payload) => {
  return {
    type: SET_COMMENT,
    payload
  };
};
export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  };
};

//초깃값
const initialState = {
  data: []
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      console.log('action.payload', action.payload);
      return { data: [...action.payload] };
    case ADD_COMMENT:
      return { data: [action.payload, ...state.data] };
    default:
      return state;
  }
};

export default comment;
