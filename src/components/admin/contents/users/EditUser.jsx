
import { Button, Form, Select, Input, Switch, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateUser } from '../../../../services/authService';
import { ROLES } from '../../../Auth/roles'
import { toast } from 'react-toastify';

const EditUser = ({ currentData, showEditForm }) => {

    const [roles, setRoles] = useState([]);
    const [currentRoles, setCurrentRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { users, setUsers } = useContext(adminContext);

    const [form] = Form.useForm();

    useEffect(() => {
        const newOptions = [];
        const currentOptions = [];
        for (const key in ROLES) {
            newOptions.push({
                label: key,
                value: ROLES[key],
            });
        }
        for (const key in ROLES) {
            if (currentData.roles.includes(ROLES[key])) {
                currentOptions.push(ROLES[key]);
            }
        }
        setCurrentRoles(currentOptions);
        setRoles(newOptions);
        setIsLoading(false);

    }, []);

    return (
        <>
            <ContentHeader title='Edit User' icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            {isLoading ? <div>Loading ...</div>
                :
                <Form
                    form={form}
                    name="edit-user"
                    layout="vertical"
                    initialValues={{ title: currentData.title, roles: currentRoles, status: currentData.status }}
                    onFinish={async (value) => {
                        const newValues = { ...currentData, password: value.password, title: value.title, roles: value.roles, status: value.status };
                        try {
                            const { data, status } = await updateUser(currentData.id, newValues);
                            if (status === 200) {
                                const newData = [...users];
                                const dataIndex = newData.findIndex(data => data.id === currentData.id);
                                newData[dataIndex] = data;
                                setUsers([...newData]);
                                toast.success("The record was successfully edited.");
                            } else {
                                toast.error("Editing failed.");
                            }
                            showEditForm(false);
                        } catch (err) {
                            toast.error("Editing failed.");
                        }
                    }}
                    onFinishFailed={err => toast.error("Please complete all fields correctly.")}
                    autoComplete="off"
                >
                    <Tag className='mb-4 p-2'>Email: {currentData.email}</Tag>
                    <Form.Item
                        label="Name"
                        name="title"
                        rules={[{ required: true, message: 'Title is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Roles"
                        name="roles"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            options={roles}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Active"
                        name="status"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            { required: true, message: 'The password is required!' },
                            { min: 6, message: 'The password cannot be less than 6 characters!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={() => showEditForm(false)}>Cancel</Button>
                        {" "}
                        <Button type="primary" htmlType="submit">Save Changes</Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
}

export default EditUser;