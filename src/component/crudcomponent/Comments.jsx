// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { setComments } from 'redux/modules/comments';

// // // 파이어베이스에 저장된 데이터 가져오기
// useEffect(() => {
//   const fetchData = async () => {
//     const boardData = query(collection(db, 'comments'));
//     const querySnapshot = await getDocs(boardData);

//     const initialBoard = [];
//     querySnapshot.forEach((doc) => {
//       const data = {
//         id: doc.id,
//         ...doc.data()
//       };
//       initialBoard.push(data);
//     });
//     dispatch(setComments(initialBoard));
//   };
//   fetchData();
// }, []);

// const nowUser = useSelector((state) => state.user.nowUser);

// const dispatch = useDispatch();
// const comments = useSelector((item) => item.board);

// const navigate = useNavigate();

// // 댓글 state들
// const [title, setTitle] = useState('');
// const [contents, setContents] = useState('');
// const [category, setCategory] = useState('');
// const [thumbnail, setThumbnail] = useState('');

// // 포커스 변수들
// const titleRef = useRef(null);
// const contentsRef = useRef(null);

// // 댓글 state change 이벤트
// const titleChanged = (e) => {
//   setTitle(e.target.value);
//   setUpdateBoard((prevState) => ({ ...prevState, title: e.target.value }));
// };
// const contentChanged = (e) => {
//   setContents(e.target.value);
//   setUpdateBoard((prevState) => ({ ...prevState, contents: e.target.value }));
// };

// // 게시물 등록
// const addCommestForm = async (e) => {
//   e.preventDefault();

//   // 댓글 등록일 함수
//   const now = new Date();
//   const regDate = now.toLocaleDateString('ko-KR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     hour12: false, // 24시간 형식 표기
//     minute: '2-digit'
//   });

//   // // 이미지 다운로드 URL 가져오기
//   // const imageUrl = await getDownloadURL(imgRef);

//   try {
//     let newComment = {
//       category,
//       title,
//       contents,
//       regDate,
//       nickname: nowUser.nickname,
//       user_id: nowUser.user_id
//     };

//     // 유효성 검사
//     if (!title) {
//       alert('제목을 입력해 주세요');
//       return titleRef.current.focus();
//     } else if (!contents) {
//       alert('내용을 입력해 주세요');
//       return contentsRef.current.focus();
//     }

//     // 파이어베이스 게시물 등록
//     const collectionRef = collection(db, 'comments');
//     await addDoc(collectionRef, newComment);

//     dispatch(insertBoard(newComment));

//     setTitle('');
//     setContents('');
//     alert('댓글이 등록되었습니다.');
//     //
//     //
//     //
//     //
//     // navigate = category;
//   } catch (error) {
//     console.error('게시물 등록 실패', error);
//   }
// };

// // 삭제
// const removeComment = async (id) => {
//   if (window.confirm('댓글을 삭제하시겠습니까?')) {
//     try {
//       // 댓글 삭제
//       const boardRef = doc(db, 'comments', id);
//       await deleteDoc(boardRef);

//       dispatch(deleteBoard(id));

//       alert('댓글이 삭제되었습니다.');
//     } catch (error) {
//       console.error('삭제 실패', error);
//     }
//   }
// };

// // 수정
// const [isCommentEditing, setIsCommentEditing] = useState(false); // 수정 모드 여부 스테이트
// const [updateComment, setUpdateComment] = useState(''); //  수정 데이터 저장

// const editingBoard = async (item) => {
//   if (window.confirm('댓글을 수정하시겠습니까?')) {
//     setUpdateComment(item); // 수정할 데이터를 상태에 저장
//     setIsCommentEditing(true); // 수정 모드로 변경
//   }
// };

// const question = useSelector((state) => {
//   return state.list.board.find((item) => item.id === updateBoard.id);
// });

// // 수정 완료 버튼 클릭 시
// const updateBoardForm = async (e) => {
//   e.preventDefault();
//   const imgRef = ref(storage, 'thumbnail/' + thumbnailId);
//   await uploadBytes(imgRef, thumbnail);
//   const imageUrl = await getDownloadURL(imgRef);
//   try {
//     const completedBoard = {
//       ...updateBoard,
//       category: updateBoard.category,
//       title: updateBoard.title,
//       contents: updateBoard.contents,
//       thumbnail: updateBoard.thumbnail,
//       imageUrl
//     };
//     await updateDoc(doc(db, 'board', question.id), completedBoard);
//     dispatch(completedEditBoard(completedBoard));
//     alert('게시물이 수정되었습니다.');
//   } catch (error) {
//     console.error('수정 실패', error);
//   }
// };

// return (
//   <Section>
//     <AddBoard>
//       <AddBoardForm onSubmit={isEditing ? updateBoardForm : addBoardForm}>
//         <SelectBox value={isEditing ? updateBoard.category : category} onChange={categoryChanged} ref={categoryRef}>
//           <option value="">카테고리를 선택해 주세요</option>
//           <option value="discussion">커뮤니티</option>
//           <option value="techTalk">질문 및 답변</option>
//         </SelectBox>
//         <TitleInput
//           value={isEditing ? updateBoard.title : title}
//           onChange={titleChanged}
//           ref={titleRef}
//           type="text"
//           placeholder="제목을 입력해 주세요"
//         />
//         <ContentDiv>
//           {/* 회원이 이미지 파일을 업로드 한 경우 미리보기 */}
//           {/* 인풋 파일에 이미지를 추가하면 URL.createObjectURL()함수가 이미지를 url로 변환해서 src에 넣어줌 */}
//           {thumbnail ? (
//             <PreviewDiv>
//               <img src={URL.createObjectURL(thumbnail)} alt="이미지" />
//               <button onClick={imgRemove}>이미지 삭제</button>
//             </PreviewDiv>
//           ) : (
//             <ThumbnailDiv>
//               <img src={isEditing ? updateBoard.imageUrl : imageFrames} alt="이미지" />

//               <label htmlFor="thumbnail">
//                 <ThumbnailBtn>{isEditing ? '이미지 변경' : '이미지 추가'}</ThumbnailBtn>
//               </label>
//               <ThumbnailInput onChange={thumbnailChanged} type="file" accept="image/*" id="thumbnail" />
//             </ThumbnailDiv>
//           )}

//           <textarea
//             value={isEditing ? updateBoard.contents : contents}
//             onChange={contentChanged}
//             ref={contentsRef}
//             placeholder="내용을 입력해 주세요"
//           ></textarea>
//         </ContentDiv>
//         <AddBtnDiv>
//           <button type="submit">{isEditing ? '수정 완료' : '작성 완료'}</button>
//         </AddBtnDiv>
//       </AddBoardForm>
//     </AddBoard>
//     {/* 수정, 삭제를 위한 테스트 코드 */}
//     {board.map((item) => {
//       return (
//         <div key={item.id}>
//           <img src={item.imageUrl} alt="" />
//           <div>아이디 ***************************{item.id}</div>
//           <div>{item.category}</div>
//           <div>{item.title}</div>
//           <div>{item.contents}</div>
//           <div>{item.regDate}</div>
//           <button onClick={() => editingBoard(item)}>수정</button>
//           <button onClick={() => removeBoard(item.id, item.thumbnail)}>삭제</button>
//         </div>
//       );
//     })
//   </Section>
// );
//   }
// export default Comments;
