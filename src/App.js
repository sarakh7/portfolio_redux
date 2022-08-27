
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/theme/Main';
import AdminLayout from './components/admin/layout/AdminLayout';
import { MainProvider } from './context/mainContext';
import { AdminProvider } from './context/adminContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import UserDashboard from './components/user-dashboard/UserDashboaed';
import { ROLES } from './components/Auth/roles'
import Unauthorized from './components/Auth/Unauthorized';
import { useEffect } from "react";
import Logout from './components/Auth/Logout';
import NotFound from './components/theme/not-found/NotFound';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLogedInUser } from './store/auth/authActions';


function App() {

  const dispatch = useDispatch();
  const loadingUser = useSelector(state => state.auth.loadingUser);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const logedInResult = await dispatch(getLogedInUser());
      
      if (logedInResult === null) {
        navigate('/logout', { replace: true });
      }
    }
    getUser();

  }, [dispatch, navigate]);

  return (
    <HelmetProvider>
      {
        loadingUser
          ? ""
          : (
            <Routes>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='/admin' element={<AdminProvider><AdminLayout /></AdminProvider>} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                <Route path='/dashboard/:userId' element={<UserDashboard />} />
              </Route>

              <Route path="unauthorized" element={<Unauthorized />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout/:from' element={<Logout />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<MainProvider><Main /></MainProvider>} />
            </Routes>
          )
      }
    </HelmetProvider>
  );
}

export default App;
