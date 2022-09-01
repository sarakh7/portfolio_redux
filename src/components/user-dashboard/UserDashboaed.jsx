import { Button, Modal } from 'antd';
import { LogoutOutlined, ArrowRightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROLES } from '../Auth/roles'
import { Helmet } from 'react-helmet-async';
import { META } from '../../utils/meta';
import styles from './user-dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../theme/contents/not-found/NotFound';
import { logOutUser } from './../../store/auth/authActions';

const UserDashboard = () => {

    const [unAuthorized, setUnAuthorized] = useState(false);

    const { auth, errorText } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {

        if (parseInt(userId) !== auth?.user?.id) {
            setUnAuthorized(true);
        }
    }, [userId, auth.user])

    return (
        <>
            {
                unAuthorized ? <>
                    <Helmet>
                        <title>{`${META.SiteName} - Not Found`}</title>
                    </Helmet>
                    <NotFound />
                </>
                    : <div className={styles.conteiner}>
                        <Helmet>
                            <title>{`${META.SiteName} - Dashboard`}</title>
                        </Helmet>
                        {
                            errorText.length > 0 ? <div>{errorText}</div>
                                : <>
                                    <h2>{`Hi, ${auth.user.title}`}</h2>
                                    <p>Welcome to the dashboard</p>
                                    {
                                        auth?.user?.roles.includes(ROLES.Admin)
                                            ? <Button
                                                onClick={() => navigate('/admin', { replace: true })}
                                                type='primary'
                                                icon={<ArrowRightOutlined />}
                                                className={styles.adminBtn}
                                            >Admin Panel</Button>
                                            : <Button
                                                onClick={() => navigate('/', { replace: true })}
                                                type='primary'
                                                icon={<ArrowRightOutlined />}
                                                className={styles.adminBtn}
                                            >Home page</Button>
                                    }
                                    <Button
                                        onClick={() => {
                                            Modal.confirm({
                                                title: 'Are you sure you want to exit?',
                                                icon: <ExclamationCircleOutlined />,
                                                okType: 'danger',
                                                onOk: () => dispatch(logOutUser())
                                            });
                                        }}
                                        type='danger'
                                        icon={<LogoutOutlined />}
                                        className={styles.exitBtn}
                                    >Sign Out</Button>
                                </>
                        }

                    </div >
            }
        </>
    );
}

export default UserDashboard;