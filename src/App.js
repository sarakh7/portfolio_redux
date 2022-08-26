
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
import jwt_decode from "jwt-decode";
import Logout from './components/Auth/Logout';
import NotFound from './components/theme/not-found/NotFound';
import { getUserById } from './services/authService';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login, userLoaded } from './store/authSlice';


function App() {

  const dispatch = useDispatch();
  const loadingUser = useSelector(state => state.auth.loadingUser);

  // const [loadingUser, setLoadingUser] = useState(true);
  // const { setAuth } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {

      const token = localStorage.getItem("accessToken");

      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          navigate('/logout', { replace: true });
        } else {
          try {
            const { data, status } = await getUserById(decodedToken.sub);
            if (status === 200) {
              // setAuth({ user: { email: decodedToken.email, id: decodedToken.sub }, roles: data.roles, accessToken: token });
              dispatch(login({ user: { email: decodedToken.email, id: decodedToken.sub }, roles: data.roles, accessToken: token }))
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
      // setLoadingUser(false);
      dispatch(userLoaded());
    }
    getUser();

  }, []);

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
              {/* <Route path='/counter' element={<Provider store={store}><Counter /></Provider>} /> */}
            </Routes>
          )
      }
    </HelmetProvider>
  );
}

export default App;
