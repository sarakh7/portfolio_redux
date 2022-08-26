
import { Form, Button, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/authService';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { META } from '../../utils/meta';
import styles from './authentication.module.css';

const Register = () => {

    const [errorText, setErrorText] = useState('');
    const [registered, setRegistered] = useState(false);

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Helmet>
                <title>{`${META.SiteName} - Sign Up`}</title>
            </Helmet>
            <div className={styles.wrapper}>
                {
                    registered
                        ? <div className='text-center'>
                            <p>Registration was successful!</p>
                            <Link to="/login">Sign In</Link>
                        </div>
                        : <>
                            <h1 className={styles.title}>Sign Up</h1>
                            <Divider />
                            <p className='text-danger text-center'>{errorText}</p>
                            <Form
                                form={form}
                                name="register"
                                layout="vertical"
                                onFinish={async (value) => {
                                    try {
                                        const { status } = await createUser({ ...value, roles: [1], status: true });
                                        if (status === 201) {
                                            setRegistered(true);
                                        } else {
                                            setErrorText("This username already exists or an error occurred during registration.");
                                        }

                                    } catch (err) {
                                        setErrorText("This username already exists or an error occurred during registration.");
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
                        </>

                }
            </div>
        </div>
    );
}

export default Register;