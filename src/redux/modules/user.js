const USER_NOW_DB = 'USER_NOW_DB';
const UPDATE_NICKNAME = 'UPDATE_NICKNAME';
const UPDATE_IMAGE = 'UPDATE_IMAGE';
const REMOVE_USER_IMAGE = 'REMOVE_USER_IMAGE';

export const setUserNowDB = (userDB) => {
  return {
    type: USER_NOW_DB,
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

export const removeUserImage = () => {
  return {
    type: REMOVE_USER_IMAGE
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
    case USER_NOW_DB:
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
    case REMOVE_USER_IMAGE:
      return {
        nowUser: {
          ...state.nowUser,
          user_img: ''
        }
      };
    default:
      return state;
  }
};

export default user;
