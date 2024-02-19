# deve11og


### < 목차 >

**# 프로젝트 소개**

- 개발 기간
- 개발 환경
- 필수 요구사항

<br/>

**# 팀원 소개**
<br/><br/>

**# 시작 가이드**

- Installation
<br/><br/>

**# 페이지 소개**

- 메인
- 로그인, 회원가입
- 마이페이지
- 게시물 등록
- 게시물 상세

**# Database Tables**

#
<br/>

**React를 활용한 뉴스피드 만들기!**
</br>

### 개발 기간 : 2024. 02.08 ~ 2024.02.15

[Deve11og 배포 링크](https://deve11og.vercel.app/) : https://deve11og.vercel.app/

[프로젝트 소개](https://www.notion.so/11-222f93576f9a473c95c1c0d978279a34)

</br></br>

### 💻️ 개발 환경
-Environment : vscode, github

-Development : React, Javascript

-Database : Firebase Firestore, Firebase Storage

-Library : redux, react-router-dom, styled-components

-Design : Figma

-Login : Firebase Authentication

-Deployment : Vercel

</br>

### ❗ 필수 요구 사항

#### 로그인, 회원 가입
-Authentication 에서 제공하는 api를 이용하여 아래 회원 가입, 로그인을 구현해보세요.
- 아이디(이메일), 패스워드
- 소셜 로그인 (구글, 깃헙)

#### CRUD
- Firestore 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요.
- CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.

#### 마이 페이지
- 내 게시물 보기
- Authentication 에서 제공하는 uid 를 이용해서 내 게시물들이 모일 수 있게 해보세요.
- 프로필 수정 기능
- Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.

#### 배포하기
- Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
- 배포에 적용될 브랜치는 main 또는 master 브랜치로 적용합니다.
---
  
#### 팀원 소개

|강지수|김연재|김철균|서가희|
|:---:|:---:|:---:|:---:|
|![강지수](https://github.com/cheolgyun7/deve11og/assets/134026105/9ed50fea-2495-4a9f-8e9e-1a70a68c64ca)|![김연재](https://github.com/cheolgyun7/deve11og/assets/134026105/6a31c74e-4bf2-487b-bc3d-86185aff8404)|![김철균](https://github.com/cheolgyun7/deve11og/assets/134026105/30359e02-e495-4b7a-b882-111ac5918b71)|![main](https://github.com/cheolgyun7/deve11og/assets/134026105/a156cdf2-5d3d-44e3-b41e-97e22bddf3b3)|
|[jigico](https://github.comjigico)|[porosadporosad](github.com/porosadporosad)|[cheolgyun7](github.com/cheolgyun7)|[seokahee](https://github.com/seokahee)|

<br/>

#### 🚩시작 가이드

```
$ git clone https://github.com/cheolgyun7/deve11og.git
$ npm install
```
<br/>

### 📃 페이지 소개

#### 메인 페이지
<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/1faca00b-2c3a-4552-858a-a7751ff2b8c5" width="80%">

- 카테고리는 커뮤니티, 질문 및 답변, About으로 구성되어 있습니다.
- 각 카테고리는 최대 5개만 표시되며, 우측 하단의 화살표를 클릭하면 해당 카테고리의 게시물 리스트가 표시됩니다.
- 로그인시 우측 상단 회원 이미지가 표시됩니다. (회원이 이미지를 등록하지 않았을 경으, 기본 이미지가 표시됩니다.)
- 회원 이미지 옆 파란 화살표를 클릭하면 로그아웃 및 마이페이지로 이동할 수 있는 드롭다운 메뉴가 표시됩니다.
- 커뮤니티 카테고리는 게시물 등록 시 회원이 업로드한 이미지와 등록된 댓글 개수가 표시됩니다.

<br/><br/>

#### 로그인, 회원가입 페이지
<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/e2756e64-fe62-413f-9395-6633c6504066" width="80%">

- 로그인 및 회원가입 페이지의 각 입력란은 미입력시 자동으로 포커스되어 유효성 검사를 통해 사용자의 편의성을 높였습니다.
- Firebase에서 제공하는 Authentication API를 이용하여 Google, Github등 소셜 로그인을 통한 간편 회원 가입 기능을 추가했습니다.
- 비밀번호 찾기 버튼을 클릭하여 모달창에서 이메일을 입력하면 비밀번호 재설정 메일이 발송됩니다.

<br/><br/>

#### 마이페이지
<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/2cfca085-0cfb-4456-95a5-1801b5bc6556" width="80%">

- 사용자가 원하는 프로필 사진을 선택하여 업로드할 수 있습니다.
- 사용자의 이메일과 닉네임이 표시되며, 닉네임은 수정 버튼을 클릭하여 변경할 수 있습니다.
- 비밀번호 재설정 버튼을 클릭하면 등록된 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.
- 작성한 게시물의 카테고리, 제목, 등록일자 등의 목록을 확인할 수 있습니다.

<br/><br/>

#### 게시물 등록
<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/bd2a8773-c1f5-4f3e-a7cf-913d5c58ebb1" width="80%">

- 페이지의 각 입력란은 미입력시 자동으로 포커스되어 유효성 검사를 통해 사용자의 편의성을 높였습니다.
- 사용자가 원하는 사진을 선택하여 업로드할 수 있습니다.

<br/><br/>

#### 게시물 상세보기
<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/bc54a9db-da43-4e47-a86f-ac443aa70c42" width="80%">

- 게시물 작성자에게만 수정 및 삭제 권한이 있습니다.
- 수정 시에는 이미지와 게시물 내용을 수정할 수 있습니다.
- 댓글 입력란에는 현재 사용자의 프로필 이미지가 표시됩니다.
- 각 댓글은 사용자의 프로필 이미지, 닉네임, 등록일, 내용 등이 표시됩니다.
- 댓글을 입력한 사용자에게만 수정 및 삭제 권한이 있습니다.

<br/>

# ♯ Database Tables

<img src ="https://github.com/cheolgyun7/deve11og/assets/134026105/9a3ece4a-4e89-431f-9508-df082c86d5dc" width="100%">

