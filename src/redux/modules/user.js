const USER_NOW_DB = 'USER_NOW_DB';
const USER_LOGIN_DB = 'USER_LOGIN_DB';
const UPDATE_NICKNAME = 'UPDATE_NICKNAME';
const UPDATE_IMAGE = 'UPDATE_IMAGE';

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

export const updateNickname = (payload) => {
  return {
    type: UPDATE_NICKNAME,
    payload
  };
};

export const updateImage = (payload) => {
  return {
    type: UPDATE_IMAGE,
    payload
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
        userloginDB: [...state.userloginDB, action.payload]
      };
    case UPDATE_NICKNAME:
      return {
        nowUser: {
          ...state.nowUser,
          nickname: action.payload
        }
      };
    case UPDATE_IMAGE:
      return {
        nowUser: {
          ...state.nowUser,
          user_img: action.payload
        }
      };
    default:
      return state;
  }
};

export default user;
