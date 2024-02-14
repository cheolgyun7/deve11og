import React, { useState, useEffect } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { updateBoard } from '../../redux/modules/list';
import styled from 'styled-components';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { deleteBoard } from '../../redux/modules/board';

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // 게시판 이미지URL state
  const [imageURL, setImageURL] = useState('');
  // 미리보기 이미지 state
  const [previewImg, setPreviewImg] = useState('');

  const navigate = useNavigate();

  const defaultImg = 'https://github.com/cheolgyun7/deve11og/blob/dev/src/image/talking-img.png';

  // 이미지 url이 없으면 기본 이미지 넣어주는 로직 어디에 끼워야할지 생각할것
  //   if (imageURL===''){
  //     const imageRef = ref(storage, 'defaultThumbnail/','defultImg.png');
  //     const url = await getDownloadURL(imageRef);
  //     setImageURL(url);
  //   }

  // 이미지 미리보기 change함수
  const imgChanged = (e) => setPreviewImg(e.target.files[0]);

  // question - 회원이 클릭한 게시물 (데이터베이스에 등록된 게시물 id와 userId가 같은걸 가져온다)
  const question = useSelector((state) => {
    return state.list.board.find((item) => item.id === id);
  });

  // 수정데이터를 담을 state
  const [updateData, setUpdateData] = useState({
    title: '',
    contents: '',
    imageURL: '',
    regDate: '',
    category: '',
    thumbnail: ''
  });

  // 수정 가능여부를 확인하는 state
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // 첫 렌더링시 데이터베이스에서 이미지 URL을 가져와서 ImageURL에 담는다

    const fetchImage = async () => {
      const imageRef = ref(storage, `thumbnail/${question.thumbnail}`);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
    };
    fetchImage();

    // 화면 렌더링시 데이터 베이스에서 가져온 데이터를 수정 데이터를 담는 state에 담아준다
    setUpdateData({
      title: question.title,
      contents: question.contents,
      imageURL: question.imageURL,
      regDate: question.regDate,
      category: question.category,
      thumbnail: question.thumbnail
    });
  }, [question]); // 게시물의 상태가 변경될때마다 화면은 재렌더링한다

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
  const handleUpdate = async (id) => {
    if (isEdit) {
      const imgRef = ref(storage, 'thumbnail/' + question.thumbnail);
      await uploadBytes(imgRef, updateData.thumbnail);
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

  // // 이미지 미리보기 삭제 함수
  const imgRemove = () => setPreviewImg('');

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
            <div>
              <input type="text" name="title" value={updateData.title} onChange={handleInputChange} />
              <input type="text" name="regDate" value={updateData.regDate} onChange={handleInputChange} readOnly />
              <ContentsDiv>
                {/* 등록된 이미지 */}
                <img src={imageURL} alt="이미지" />

                {/* <img src={imageURL ? imageURL : URL.createObjectURL(previewImg)} alt="이미지" /> */}
                {/* <label htmlFor="thumbnail">
                  <ThumbnailBtn>이미지 변경</ThumbnailBtn>
                </label>
                <ThumbnailInput onChange={imgChanged} type="file" accept="image/*" id="thumbnail" /> */}

                {/* <label>
                  이미지 업로드
                  <input type="file" onChange={fileSelect} accept="image/*" />
                </label>
                {!isImageRemovable ? <></> : <BtnBlackText onClick={handleRemove}>이미지 제거</BtnBlackText>} */}

                {/* {imageURL ? (
                  <PreviewDiv>
                    <img src={imageURL} alt="이미지" />
                    <button onClick={imgRemove}>이미지 삭제</button>
                  </PreviewDiv>
                ) : (
                  <ThumbnailDiv>
                    <img src={URL.createObjectURL(previewImg)} alt="이미지" />

                    <label htmlFor="thumbnail">
                      <ThumbnailBtn>이미지 추가</ThumbnailBtn>
                    </label>
                    <ThumbnailInput onChange={imgChanged} type="file" accept="image/*" id="thumbnail" />
                  </ThumbnailDiv>
                )} */}

                <textarea type="text" name="contents" value={updateData.contents} onChange={handleInputChange} />
              </ContentsDiv>
            </div>
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

const ContentsDiv = styled.div`
  display: flex;
`;

const PreviewDiv = styled.div``;
const ThumbnailDiv = styled.div``;
const ThumbnailInput = styled.input``;
const ThumbnailBtn = styled.div`
  width: 100%;
  background-color: blue;
  padding: 100px;
`;

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
