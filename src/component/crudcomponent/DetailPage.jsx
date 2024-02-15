import React, { useState, useEffect } from 'react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BtnBlackBg, BtnBlackText, Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { updateBoard, setDeleteBoard } from '../../redux/modules/list';
import styled from 'styled-components';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CommentSection from './CommentSection';

const DetailPage = () => {
  const { user_id } = useSelector((state) => state.user.nowUser);
  const dispatch = useDispatch();
  const { id } = useParams();

  // 게시판 이미지URL state
  const [imageURL, setImageURL] = useState('');
  // 미리보기 이미지 state
  const [imgFile, setimgFile] = useState('');

  const navigate = useNavigate();

  // question - 회원이 클릭한 게시물 (데이터베이스에 등록된 게시물)
  const question = useSelector((state) => {
    return state.list.board.find((item) => item.id === id);
  });

  // 수정데이터를 담을 state
  const [updateData, setUpdateData] = useState({
    ...question
  });

  // 수정 가능여부를 확인하는 state
  const [isEdit, setIsEdit] = useState(false);
  const [isImageDelete, setIsImageDelete] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const docRef = doc(db, 'board', id);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        const data = docSnap.data();
        const imageRef = ref(storage, `thumbnail/${data.thumbnail}`);
        const url = await getDownloadURL(imageRef);
        setUpdateData({
          title: data.title,
          contents: data.contents,
          imageURL: data.imageURL,
          regDate: data.regDate,
          category: data.category,
          thumbnail: data.thumbnail,
          user_id: data.user_id
        });
        // 첫 렌더링시 데이터베이스에서 이미지 URL을 가져와서 ImageURL에 담는다
        setImageURL(url);
      }
    };
    fetchImage();
  }, [id]);

  // input의 change이벤트 묶음
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
  const fileSelect = async (e) => {
    const file = e.target.files[0];
    setIsImageDelete(true);
    setimgFile(file);
  };

  const handleUpdate = async (id) => {
    const imgRef = ref(storage, 'thumbnail/' + imgFile.name);
    await uploadBytes(imgRef, imgFile);
    const imageUrl = await getDownloadURL(imgRef);
    setImageURL(imageUrl);
    if (isEdit) {
      try {
        const updatedBoard = {
          ...question,
          title: updateData.title,
          contents: updateData.contents,
          regDate: updateData.regDate,
          category: updateData.category,
          thumbnail: imgFile.name ? imgFile.name : question.thumbnail
        };
        // 이미지 파일이 있다는것은 이미지 파일이 수정되었다는것.
        if (imgFile) {
          // 수정된 파일을 기존 파일 위에 덮어씌우기
          const imgRef = ref(storage, 'thumbnail/' + question.thumbnail);
          await uploadBytes(imgRef, imgFile);
        }
        await updateDoc(doc(db, 'board', id), updatedBoard);

        dispatch(updateBoard(updatedBoard));

        alert('게시물이 수정되었습니다.');
        setIsImageDelete(false);
        navigate('/');
      } catch (error) {
        console.error('게시물 수정 실패', error);
      }
    }
    setIsEdit(!isEdit);
  };

  // 삭제
  const removeBoard = async (id, thumbnail) => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      try {
        // 이미지 삭제
        const imgRef = ref(storage, 'thumbnail/' + thumbnail);
        deleteObject(imgRef);

        // 게시물 삭제
        const boardRef = doc(db, 'board', id);
        await deleteDoc(boardRef);

        dispatch(setDeleteBoard(id, thumbnail));

        alert('게시물이 삭제되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  // 이미지 삭제
  const handleRemove = () => setimgFile('');
  return (
    <Section>
      <DetailPageBox>
        <DetailPageBoxCard>
          <UpdateSelectBox name="category" value={updateData.category} onChange={handleInputChange}>
            <option value="discussion">커뮤니티</option>
            <option value="asklist">질문 및 답변</option>
          </UpdateSelectBox>
          {/* 수정 상태를 확인하는 삼항 연산자 */}
          {isEdit === true ? (
            <>
              <input type="text" name="title" value={updateData.title} onChange={handleInputChange} />
              <input type="text" name="regDate" value={updateData.regDate} onChange={handleInputChange} readOnly />

              <ContentsDiv>
                {/* 등록된 이미지 */}
                {imageURL ? <img src={imageURL} alt="이미지" /> : <div>등록된 이미지가 없습니다</div>}
                <p>
                  {/* <label>이미지 업로드</label> */}
                  <input type="file" onChange={fileSelect} accept="image/*" />
                  {!isImageDelete ? <></> : <div onClick={handleRemove}>이미지 제거</div>}
                </p>
              </ContentsDiv>

              <textarea type="text" name="contents" value={updateData.contents} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <h2>{updateData.title}</h2>
              <span>{updateData.regDate}</span>
              <ContentsDiv>{<img src={imageURL} alt="미리보기" />}</ContentsDiv>
              <span>{updateData.contents}</span>
            </>
          )}
          {user_id && updateData.user_id === user_id ? (
            <p>
              <BtnBlackBg
                onClick={() => {
                  handleUpdate(question.id);
                }}
              >
                {isEdit ? '수정완료' : '수정'}
              </BtnBlackBg>
              <BtnBlackText
                onClick={() => {
                  removeBoard(question.id, question.thumbnail);
                }}
              >
                삭제
              </BtnBlackText>
            </p>
          ) : (
            <></>
          )}
        </DetailPageBoxCard>
      </DetailPageBox>
      {!isEdit ? <CommentSection /> : <></>}
    </Section>
  );
};
export default DetailPage;

const ContentsDiv = styled.div``;
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
    display: inline-flex;
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
  ${ContentsDiv} {
    display: inline-flex;
    justify-content: center;
    width: 30%;
    height: 70%;
    background-color: black;
    position: relative;
    p {
      position: absolute;
      bottom: -3rem;
      input {
        font-size: 1rem;
      }
    }
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
