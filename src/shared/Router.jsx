import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../component/Home';
import Layout from '../component/layout/Layout';
import Login from 'component/authentication/Login';
import Mypage from 'component/authentication/Mypage';
import Register from 'component/authentication/Register';
import Write from 'component/crudcomponent/Write';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
