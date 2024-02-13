// Action Creator

export const setComments = (payload) => {
  return {
    type: SET_COMMENTS,
    payload
  };
};
export const insertComment = (payload) => {
  return {
    type: INSERT_COMMENTS,
    payload
  };
};

export const deleteComment = (payload) => {
  return {
    type: DELETE_COMMENTS,
    payload
  };
};
export const completedEditComment = (payload) => {
  return {
    type: UPDATE_COMMENTS,
    payload
  };
};

// 초기 상태값
const initialState = [];

// Action Values
export const SET_COMMENTS = 'SET_COMMENTS';
export const INSERT_COMMENTS = 'INSERT_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

const comments = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;

    case INSERT_COMMENTS:
      // action.payload => 새 게시물(newBoard)
      const newBoard = action.payload;
      return [...state, newBoard];

    case DELETE_COMMENTS:
      // action.payload => 삭제할 boardID
      const deleteBoardId = action.payload;
      const deleteBoard = state.filter((board) => board.id !== deleteBoardId);
      return deleteBoard;

    case UPDATE_COMMENTS:
      // action.payload => 수정완료 게시물
      const updateBoardId = action.payload;
      const updateBoard = state.map((board) => {
        if (board.id === updateBoardId) {
          return {
            ...board,
            title: board.title,
            contents: board.contents,
            category: board.category,
            thumbnail: board.thumbnail
          };
          // 카테고리, 이미지, 제목, 내용이 바뀐 값을 updateBoard에 담아야함, 어떻게?
        }
      });
      return updateBoard;

    default:
      return state;
  }
};

export default board;
