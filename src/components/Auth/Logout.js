
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {from} = useParams();

    useEffect(() => {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        navigate(from ? `/${from}` : '/', { replace: true });
    }, [])

    return null
}

export default Logout