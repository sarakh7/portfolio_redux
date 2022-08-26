
import { Form, Button, Input, Divider } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { META } from '../../utils/meta';
import styles from './authentication.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

const Login = () => {

    const [errorText, setErrorText]= useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const [form] = Form.useForm();
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{`${META.SiteName} - Sign In`}</title>
            </Helmet>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Sign In</h1>
                <Divider />
                <p className='text-danger text-center'>{errorText}</p>
                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={async (value) => {
                        try {
                            const { data, status } = await loginUser(value);
                            if (status === 200 && data?.user?.status === true ) {
                                const accessToken = data?.accessToken;
                                const roles = data?.user?.roles;
                                const loggedInUser = {email: data?.user?.email, id: JSON.stringify(data?.user?.id)};
                                localStorage.setItem("accessToken", accessToken);
                                dispatch(login({ user: loggedInUser, roles , accessToken }))
                                navigate(from || `/dashboard/${data?.user?.id}`, { replace: true });
                            } else {
                                setErrorText("The username or password is incorrect");
                                
                            }

                        } catch (err) {
                            setErrorText("The username or password is incorrect");
                        }
                        form.resetFields();
                    }}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'The email is required!' },
                            { type: 'email', message: 'The email is not valid!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'The password is required!' },
                            { min: 6, message: 'The password cannot be less than 6 characters!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className={styles.btnWrapper}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Sign In</Button>
                        </Form.Item>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;