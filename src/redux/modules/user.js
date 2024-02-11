const USER_NOW_DB = 'USER_NOW_DB';
const USER_LOGIN_DB = 'USER_LOGIN_DB';

export const setUserNowDB = (userDB) => {
  return {
    type: USER_NOW_DB,
    payload: userDB
  };
};

export const setUserLoginDB = (userDB) => {
  return {
    type: USER_LOGIN_DB,
    payload: userDB
  };
};

const initialState = {
  nowUser: {
    user_id: '',
    email: '',
    nickname: '',
    user_img: ''
  },
  userloginDB: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_NOW_DB:
      return {
        ...state,
        nowUser: action.payload
      };
    case USER_LOGIN_DB:
      return {
        ...state,
        userloginDB: [...state.userDB, action.payload]
      };
    default:
      return state;
  }
};

export default user;
