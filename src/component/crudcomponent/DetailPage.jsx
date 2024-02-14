import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { SET_DELETEBOARD, updateBoard } from '../../redux/modules/list';
import styled from 'styled-components';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { deleteBoard, setBoard } from '../../redux/modules/board';
import imageFrames from '../../image/imageFrames.png';

const DetailPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [imageURL, setImageURL] = useState('');

  const question = useSelector((state) => {
    return state.list.board.find((item) => item.id === userId);
  });

  // console.log(question, 'question');
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    title: '',
    contents: '',
    imageURL: '',
    regDate: '',
    category: '',
    thumbnail: ''
  });

  const [isEdit, setIsEdit] = useState(false); //수정가능한상태

  useEffect(() => {
    const fetchImage = async () => {
      if (question) {
        const imageRef = ref(storage, `thumbnail/${question.thumbnail}`);
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      }
    };
    fetchImage();

    if (question) {
      setUpdateData({
        title: question.title,
        contents: question.contents,
        imageURL: question.imageURL,
        regDate: question.regDate,
        category: question.category,
        thumbnail: question.thumbnail
      });
    }
  }, [question]);

  const handleInputChange = (e) => {
    if (isEdit) {
      // 입력 필드의 이름을 가져옴 (title 또는 contents)
      const fieldName = e.target.name;

      // 입력된 값
      const fieldValue = e.target.value;

      // 기존 boardData 복사
      const updatedData = { ...updateData };

      // 해당 필드 업데이트
      updatedData[fieldName] = fieldValue;

      // 업데이트된 데이터로 boardData 업데이트
      setUpdateData(updatedData);
    } else {
      alert('수정버튼을 누르고 수정하세요');
    }
  };

  // 수정
  const handleUpdate = async (id) => {
    if (isEdit) {
      const imgRef = ref(storage, 'thumbnail/' + question.thumbnailId);
      await uploadBytes(imgRef, question.thumbnail);
      const imageUrl = await getDownloadURL(imgRef);

      try {
        const updatedBoard = {
          ...question,
          title: updateData.title,
          contents: updateData.contents,
          regDate: updateData.regDate,
          category: updateData.category,
          thumbnail: updateData.thumbnail,
          imageUrl
        };

        await updateDoc(doc(db, 'board', id), updatedBoard);

        dispatch(updateBoard(updatedBoard));

        alert('게시물이 수정되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('게시물 수정 실패', error);
      }
    }
    setIsEdit(!isEdit);
  };

  // 삭제
  const removeBoard = async (id, thumbnail) => {
    console.log('id', id);
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      try {
        // 이미지 삭제
        const imgRef = ref(storage, 'thumbnail/' + thumbnail);
        deleteObject(imgRef);

        // 게시물 삭제
        const boardRef = doc(db, 'board', id);
        await deleteDoc(boardRef);

        dispatch(deleteBoard(id, thumbnail));

        alert('게시물이 삭제되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  // 이미지 미리보기 삭제 함수
  const imgRemove = () => {
    // setThumbnail('');
  };
  return (
    <Section>
      <DetailPageBox>
        <DetailPageBoxCard>
          <UpdateSelectBox name="category" value={updateData.category} onChange={handleInputChange}>
            <option value="discussion">커뮤니티</option>
            <option value="asklist">질문 및 답변</option>
          </UpdateSelectBox>
          {isEdit === true ? (
            <>
              <input type="text" name="title" value={updateData.title} onChange={handleInputChange} />
              <input type="text" name="regDate" value={updateData.regDate} onChange={handleInputChange} readOnly />
              {/* <div>{<img src={imageURL} alt="미리보기" />}</div> */}
              <textarea type="text" name="contents" value={updateData.contents} onChange={handleInputChange} />

              {updateData.thumbnail ? (
                <PreviewDiv>
                  <img src={URL.createObjectURL(imageURL)} alt="이미지" />
                  <button onClick={imgRemove}>이미지 삭제</button>
                </PreviewDiv>
              ) : (
                <ThumbnailDiv>
                  <img src={imageFrames} alt="이미지" />

                  {/* <label htmlFor="thumbnail">
                    <ThumbnailBtn>이미지 추가</ThumbnailBtn>
                  </label> */}

                  <ThumbnailInput
                    onChange={handleInputChange}
                    name="file"
                    type="file"
                    accept="image/*"
                    id="thumbnail"
                  />
                </ThumbnailDiv>
              )}

              <label htmlFor="thumbnail">
                <div>이미지 변경</div>
              </label>
              <input onChange={handleInputChange} name="file" type="file" accept="image/*" id="thumbnail" />
            </>
          ) : (
            <>
              <h2>{updateData.title}</h2>
              <span>{updateData.regDate}</span>
              <div>{<img src={imageURL} alt="미리보기" />}</div>

              <span>{updateData.contents}</span>
            </>
          )}
          <p>
            <button
              onClick={() => {
                handleUpdate(question.id);
              }}
            >
              {isEdit ? '수정완료' : '수정'}
            </button>
            <button
              onClick={() => {
                removeBoard(question.id, question.thumbnail);
                // handleCancel(question.boardId);
              }}
            >
              삭제
            </button>
          </p>
        </DetailPageBoxCard>
      </DetailPageBox>
    </Section>
  );
};
export default DetailPage;

const PreviewDiv = styled.div``;
const ThumbnailDiv = styled.div``;
const ThumbnailInput = styled.input``;
const ThumbnailBtn = styled.div``;

export const DetailPageBox = styled.div``;
export const DetailPageBoxCard = styled.div`
  width: 75%;
  height: 50vh;
  position: relative;
  padding: 1rem;
  border: 1px solid black;
  margin: 0 auto;
  input {
    display: block;
    margin-bottom: 1rem;
    &:first-of-type {
      font-size: 2rem;
    }
  }
  textarea {
    display: inline-block;
    padding: 1rem;
    vertical-align: top;
    width: 70%;
    height: 50%;
    resize: none;
  }
  span {
    display: block;
    margin-bottom: 1rem;
    &:last-of-type {
      display: inline-flex;
      vertical-align: top;
      padding: 1rem;
    }
  }
  p {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  div {
    display: inline-flex;
    justify-content: center;
    width: 30%;
    height: 70%;
    background-color: black;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
export const UpdateSelectBox = styled.select`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
