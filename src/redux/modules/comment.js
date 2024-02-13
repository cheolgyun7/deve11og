import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

//Action Value
const SET_COMMENT = 'comment/SET_COMMENT';
const ADD_COMMENT = 'comment/ADD_COMMENT';

//Action Creator
export const setComment = (payload) => {
  return {
    type: SET_COMMENT,
    payload
  };
};
export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  };
};

//댓글 데이터 가져오기
// const fetchData = async () => {
//   const q = query(collection(db, 'comments'));
//   const querySnapshot = await getDocs(q);

//   const initialData = [];

//   Promise.allSettled(
//     querySnapshot.forEach((doc) => {
//       initialData.push({ id: doc.id, ...doc.data() });
//     })
//   )

//   querySnapshot.forEach((doc) => {
//     initialData.push({ id: doc.id, ...doc.data() });
//   });

//   // firestore에서 가져온 데이터를 state에 전달
//   console.log(initialData);
//   return initialData;
// };

//초깃값
const initialState = {
  data: []
  // data: fetchData(),
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return action.payload;
    case ADD_COMMENT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default comment;
