import thumbnail from '../../image/talking-img.png';
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
const initialState = [
  {
    cnt: 0,
    contents: '테스트',
    liked: 0,
    regDate: '2024-01-01 15:20',
    thumbnail: thumbnail, // 이미지의 UUID를 게시물에 저장
    title: '제목',
    category: 'discussion'
  }
];

// Action Values
export const INSERT_BOARD = 'INSERT_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

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

    default:
      return state;
  }
};

export default board;
