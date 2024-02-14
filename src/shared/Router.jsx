import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../component/Home';
import Layout from '../component/layout/Layout';
import Login from 'component/authentication/Login';
import MyPage from 'component/authentication/MyPage';
import Register from 'component/authentication/Register';
import Write from 'component/crudcomponent/Write';
import Read from 'component/crudcomponent/Read';
import AskList from 'component/crudcomponent/AskList';
import DetailPage from 'component/crudcomponent/DetailPage';
import CommunityList from 'component/crudcomponent/CommunityList';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/read" element={<Read />}></Route>
          <Route path="/asklist" element={<AskList />}></Route>
          <Route path="/communityList" element={<CommunityList />}></Route>
          <Route path="/detailPage/:id" element={<DetailPage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
