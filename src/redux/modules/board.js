export const setBoard = (payload) => {
  return {
    type: SET_BOARD,
    payload
  };
};
export const insertBoard = (payload) => {
  return {
    type: INSERT_BOARD,
    payload
  };
};

// 초기 상태값
const initialState = [
  {
    category: '',
    title: '',
    contents: '',
    regDate: '',
    thumbnail: '',
    imageUrl: '',
    nickname: '',
    user_id: '',
    cnt: 0,
    liked: 0
  }
];
// Action Values
export const SET_BOARD = 'SET_BOARD';
export const INSERT_BOARD = 'INSERT_BOARD';

const board = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      console.log('action.type', action.type);

      return action.payload;
    case INSERT_BOARD:
      // action.payload => 새 게시물(newBoard)
      const newBoard = action.payload;
      return [...state, newBoard];

    default:
      return state;
  }
};
export default board;
