import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword';
import Register from '../pages/Register/Register';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
    </Routes>
  );
};

export default AuthRoutes;