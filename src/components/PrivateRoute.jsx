import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;