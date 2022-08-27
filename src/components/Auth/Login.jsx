
import { Form, Button, Input, Divider } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { META } from '../../utils/meta';
import styles from './authentication.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authentication } from '../../store/auth/authActions';

const Login = () => {

    const dispatch = useDispatch();
    const errorText = useSelector(state => state.auth.errorText);

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
                        const result = await dispatch(authentication(value));
                        if(result?.payload?.user) {
                            navigate(from || `/dashboard/${result?.payload?.user?.id}`, { replace: true });
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