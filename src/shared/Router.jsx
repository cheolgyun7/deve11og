import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../component/Home';
import Layout from '../component/layout/Layout';
import Login from 'component/authentication/Login';
import MyPage from 'component/authentication/MyPage';
import Register from 'component/authentication/Register';
import Write from 'component/crudcomponent/Write';
import Read from 'component/crudcomponent/Read';

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
