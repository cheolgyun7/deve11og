import { db } from '../../firebase';

export const SET_BOARD = 'SET_BOARD';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
// 액션 타입 정의
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const SET_DELETEBOARD = 'SET_DELETEBOARD';

// 액션 생성자 함수 정의
export const updateBoard = (board) => ({
  type: UPDATE_BOARD,
  payload: board
});

// 액션 생성자 함수
export const setBoard = (board) => ({
  type: SET_BOARD,
  payload: board
});

export const setDeleteBoard = (board) => ({
  type: SET_DELETEBOARD,
  payload: board
});

// 좋아요 토글 액션 생성자 함수
export const toggleLike = (postId, isLiked, user_id) => ({
  type: TOGGLE_LIKE,
  payload: {
    postId,
    isLiked,
    user_id
  }
});

// 리듀서
const initialState = {
  board: []
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.payload
      };

    case UPDATE_BOARD:
      // 업데이트된 게시물 정보를 받아와서 해당 게시물을 찾아 업데이트합니다.
      const board = state.board.map((item) => {
        if (item.id === action.payload.boardId) {
          // 수정된 게시물의 ID를 기준으로 찾음
          return action.payload; // 수정된 게시물 정보로 업데이트
        }
        return item; // 기존 게시물 정보 유지
      });
      return {
        ...state,
        board // 업데이트된 게시물로 상태 업데이트
      };

    case SET_DELETEBOARD:
      // action.payload => 삭제할 boardID
      const deleteBoardId = action.payload;
      const deleteBoard = state.board.filter((board) => board.id !== deleteBoardId);
      return {
        ...state,
        board: deleteBoard
      };
    case TOGGLE_LIKE:
      const { postId, isLiked, user_id } = action.payload;
      const likedBoard = state.board.map((item) => {
        if (item.id === postId) {
          return {
            ...item,
            liked: !isLiked // 좋아요 상태 토글
          };
        }
        return item;
      });
      return {
        ...state,
        board: likedBoard
      };
    // case TOGGLE_LIKE:
    //   const { postId, isLiked, userId } = action.payload;
    //   const updatedBoard = state.board.map((item) => {
    //     if (item.id === postId) {
    //       return {
    //         ...item,
    //         isLiked: isLiked
    //       };
    //     }
    //     return item;
    //   });

    //   // Firebase에 좋아요 정보 업데이트
    //   db.firestore()
    //     .collection('likes')
    //     .doc(userId)
    //     .set(
    //       {
    //         likedPosts: updatedBoard.filter((item) => item.isLiked).map((item) => item.id)
    //       },
    //       { merge: true }
    //     );

    //   return {
    //     ...state,
    //     board: updatedBoard
    //   };
    default:
      return state;
  }
};

export default list;
