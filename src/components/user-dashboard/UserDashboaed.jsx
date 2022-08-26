import { Button, Modal } from 'antd';
import { LogoutOutlined, ArrowRightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/authService';
import { ROLES } from '../Auth/roles'
import { Helmet } from 'react-helmet-async';
import { META } from '../../utils/meta';
import styles from './user-dashboard.module.css';
import NotFound from '../theme/not-found/NotFound';
import { useSelector } from 'react-redux';

const UserDashboard = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [unAuthorized, setUnAuthorized] = useState(false);

    const auth = useSelector(state => state.auth.auth);

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status } = await getUserById(userId);
                if (status === 200) {
                    setUser(data);
                }
            } catch (err) {
                setError(true);
            }
        }
        if (userId === auth?.user?.id) {
            fetchUser();
        } else {
            setUnAuthorized(true);
        }
    }, [])

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
                            error ? <div>There was an error receiving information</div>
                                : <>
                                    <h2>{`Hi, ${user.title}`}</h2>
                                    <p>Welcome to the dashboard</p>
                                    {
                                        auth?.roles.includes(ROLES.Admin)
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
                                                onOk() { navigate('/logout', { replace: true }) }
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