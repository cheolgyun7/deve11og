//Action Value
const SET_COMMENT = 'comment/SET_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';

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
export const updateComment = (payload) => {
  return {
    type: UPDATE_COMMENT,
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
    case UPDATE_COMMENT:
      return { data: [...state.data, action.payload] };
    default:
      return state;
  }
};

export default comment;
