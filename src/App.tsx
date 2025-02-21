import { BrowserRouter as Router } from 'react-router-dom';
import AuthRoutes from './pages/Auth/routes/authRoutes';

const App = () => {
  return (
    <Router>
      <AuthRoutes />
    </Router>
  );
}

export default App;