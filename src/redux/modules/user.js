const USER_DB = 'USER_DB';

export const setUserDB = (userDB) => {
  return {
    type: USER_DB,
    payload: userDB
  };
};

const initialState = {
  nowUser: {
    user_id: '',
    email: '',
    nickname: '',
    user_img: ''
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_DB:
      return {
        ...state,
        nowUser: action.payload
      };
    default:
      return state;
  }
};

export default user;
