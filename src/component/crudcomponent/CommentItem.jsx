import { doc, updateDoc } from '@firebase/firestore';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../redux/modules/comment';
import styled from 'styled-components';
import { BtnBlackBg, BtnBlackText } from 'styles/SharedStyle';
import { db } from '../../firebase';

export default function CommentItem({ data }) {
  const { id, user_id, nickname, contents, regDate, board_id } = data;
  const { user_id: nowUserId } = useSelector((state) => state.user.nowUser);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(contents);
  const dispatch = useDispatch();

  //수정 모드 활성화
  const handleEditClick = () => {
    setIsEditing(true);
  };

  //수정 모드 비활성화
  const handleCancelClick = () => {
    setIsEditing(false);
    setContent(contents);
  };

  console.log(board_id, { ...data });
  //수정 완료 기능
  const handleSave = async () => {
    const commentRef = doc(db, 'comments', id);
    try {
      await updateDoc(commentRef, { ...data, contents: content });
      dispatch(updateComment({ ...data, contents: content }));
      alert('수정이 완료되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('에러가 발생했습니다');
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <CommentItemStyle>
      <CommentTopInfo>
        <ThumbBox>
          {/* <img src={findData && findData.user_img ? DEFAULT_IMAGE : findData.user_img} alt="" /> */}
        </ThumbBox>
        <div>
          {user_id}
          <NicknameStyle>{nickname}</NicknameStyle>
          <DateStyle>{regDate}</DateStyle>
        </div>
      </CommentTopInfo>
      <CommentCont>
        <ContArea>
          {isEditing ? (
            <CommentInput type="text" value={content} onChange={handleChange} placeholder="내용을 입력해주세요" />
          ) : (
            <p>{content}</p>
          )}
        </ContArea>
        {nowUserId === user_id ? (
          !isEditing ? (
            <div>
              <BtnBlackBg onClick={handleEditClick}>수정</BtnBlackBg>
              <BtnBlackText>삭제</BtnBlackText>
            </div>
          ) : (
            <div>
              <BtnBlackBg onClick={handleSave}>완료</BtnBlackBg>
              <BtnBlackText onClick={handleCancelClick}>취소</BtnBlackText>
            </div>
          )
        ) : (
          <></>
        )}
      </CommentCont>
    </CommentItemStyle>
  );
}

const CommentItemStyle = styled.li`
  padding: 1rem 2rem;

  & + li {
    border-top: 1px solid #ddd;
  }
`;
const CommentTopInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ThumbBox = styled.figure`
  margin-right: 1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;

  & img {
    max-width: 100%;
  }
`;
const NicknameStyle = styled.strong`
  display: block;
`;
const DateStyle = styled.span`
  font-size: 0.8rem;
  color: #999999;
`;
const CommentCont = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ContArea = styled.div`
  width: calc(100% - 120px);

  & p {
    padding: 0.5rem;
  }
`;
const CommentInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #ddd;
  font-family: inherit;
  font-size: 1rem;
`;
