// Action Creator

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

export const deleteBoard = (payload) => {
  return {
    type: DELETE_BOARD,
    payload
  };
};
export const completedEditBoard = (payload) => {
  return {
    type: UPDATE_BOARD,
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
export const DELETE_BOARD = 'DELETE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

const board = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      console.log('action.type', action.type);

      return action.payload;

    case INSERT_BOARD:
      // action.payload => 새 게시물(newBoard)
      const newBoard = action.payload;
      return [...state, newBoard];

    case DELETE_BOARD:
      // action.payload => 삭제할 boardID
      const deleteBoardId = action.payload;
      const deleteBoard = state.filter((board) => board.id !== deleteBoardId);
      return deleteBoard;

    case UPDATE_BOARD:
      // action.payload => 수정완료 게시물
      console.log('action.payload', action.payload);
      const updateBoardId = action.payload;
      const updateBoard = state.map((board) => {
        if (board.id === updateBoardId.id) {
          return {
            ...board,
            title: board.title,
            contents: board.contents,
            category: board.category,
            thumbnail: board.thumbnail,
            imgUrl: board.imageUrl
          };
        }
      });
      return [...state, updateBoard];

    default:
      return state;
  }
};

export default board;
