import { Route, Routes } from 'react-router-dom';
import Login from '../Login';
import RecoveryPassword from '../RecoveryPassword';
import Register from '../Register';
import { FormProvider } from '../contexts/loginFormContext'
const AuthRoutes = () => {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery-password" element={<RecoveryPassword />} />
      </Routes>
    </FormProvider>
  );
};

export default AuthRoutes;