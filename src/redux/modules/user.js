const USER_DB = 'USER_DB';
const UPDATE_NICKNAME = 'UPDATE_NICKNAME';
const UPDATE_IMAGE = 'UPDATE_IMAGE';

export const setUserDB = (userDB) => {
  return {
    type: USER_DB,
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
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_DB:
      return {
        ...state,
        nowUser: action.payload
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
