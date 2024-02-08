// Action Values
const INSERT_BOARD = 'INSERT_BOARD';
const GET_BOARD = 'GET_BOARD';
const LIST_BOARD = 'LIST_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';

// Action Creator
export const insertBoard = () => {
  return {
    type: INSERT_BOARD
  };
};
export const getBoard = () => {
  return {
    type: GET_BOARD
  };
};
export const ListtBoard = () => {
  return {
    type: LIST_BOARD
  };
};
export const deleteBoard = () => {
  return {
    type: DELETE_BOARD
  };
};
export const updateBoard = () => {
  return {
    type: UPDATE_BOARD
  };
};

// 초기 상태값
const initialState = [
  {
    cnt: 2,
    contents: '내용입니다',
    liked: 0,
    marked: false,
    regDate: '2024-02-08 15:30',
    title: '제목입니다.',
    albumImg: null
  }
];

// const board = (state = initialState, action) => {
//   switch (action.type) {
//     case INSERT_BOARD:
//       const {title,content,liked,marked
//       ,regDate,albumImg}
//       return
//     default:
//       return state;
//   }
// };

// case ADD_TODO:
//       const { title, content } = action.payload;
//       const newObj = {
//         id: shortid.generate(),
//         title,
//         body: content,
//         isDone: false
//       };
//       const newArr = state;
//       newArr.push(newObj);
//       return [...newArr];
