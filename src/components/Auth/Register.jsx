
import { Form, Button, Input, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { META } from '../../utils/meta';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth/authActions';
import styles from './authentication.module.css';

const Register = () => {

    const dispatch = useDispatch();
    const errorText = useSelector(state => state.auth.errorText);

    const navigate = useNavigate();

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Helmet>
                <title>{`${META.SiteName} - Sign Up`}</title>
            </Helmet>
            <div className={styles.wrapper}>

                <h1 className={styles.title}>Sign Up</h1>
                <Divider />
                <p className='text-danger text-center'>{errorText}</p>
                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    onFinish={async (value) => {
                        const result = await dispatch(registerUser(value));
                        if(result?.payload?.user) {
                            navigate(`/dashboard/${result?.payload?.user?.id}`, { replace: true });
                        } else {
                            navigate('/login', { replace: true });
                        }
                        form.resetFields();
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="title"
                        rules={[
                            { required: true, message: 'The Full Name is required!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
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
                            <Button type="primary" htmlType="submit">Sign Up</Button>
                        </Form.Item>
                        <Link to="/login">Sign In</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;