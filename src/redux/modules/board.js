// Action Creator
// export const insertBoard = (payload) => {
//   return {
//     type: INSERT_BOARD,
//     payload
//   };
// };
// export const getBoard = () => {
//   return {
//     type: GET_BOARD
//   };
// };
// export const ListtBoard = () => {
//   return {
//     type: LIST_BOARD
//   };
// };
// export const deleteBoard = () => {
//   return {
//     type: DELETE_BOARD
//   };
// };
// export const updateBoard = () => {
//   return {
//     type: UPDATE_BOARD
//   };
// };

// 액션 크리에이터 활용하는 방법 확인

// 초기 상태값
const initialState = [{}];

// Action Values
const INSERT_BOARD = 'INSERT_BOARD';
const GET_BOARD = 'GET_BOARD';
const LIST_BOARD = 'LIST_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';

const board = (state = initialState, action) => {
  switch (action.type) {
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
      // action.payload => 수정할 boardID
      const updateBoardId = action.payload;
      const updateBoard = state.map((board) => {
        if (board.id === updateBoardId) {
          return { ...board };
          // 카테고리, 이미지, 제목, 내용이 바뀐 값을 updateBoard에 담아야함, 어떻게?
        }
      });
      return updateBoard;

    case GET_BOARD:
      // action.payload => 등록된 boardID
      return;

    case LIST_BOARD:
      // action.payload => 전체 board
      return;

    default:
      return state;
  }
};

export default board;
