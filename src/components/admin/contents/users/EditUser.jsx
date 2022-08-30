
import { Button, Form, Select, Input, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { ROLES } from '../../../Auth/roles'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem } from '../../../../store/entities/adminActions';

const EditUser = () => {

    const [roles, setRoles] = useState([]);
    const [currentRoles, setCurrentRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();
    const service = useSliceService();

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
            if (currentItem.roles.includes(ROLES[key])) {
                currentOptions.push(ROLES[key]);
            }
        }
        setCurrentRoles(currentOptions);
        setRoles(newOptions);
        setIsLoading(false);

    }, [currentItem]);

    return (
        <>
            {isLoading ? <div>Loading ...</div>
                :
                <Form
                    form={form}
                    name="edit-user"
                    layout="vertical"
                    initialValues={{ title: currentItem.title, roles: currentRoles, status: currentItem.status }}
                    onFinish={value => dispatch(editItem(actions, {
                        ...currentItem,
                        password: value.password,
                        title: value.title,
                        roles: value.roles,
                        status: value.status
                    }, service.updateItem))}
                    //         {
                    //                 const newValues = { ...currentItem, password: value.password, title: value.title, roles: value.roles, status: value.status };
                    //                 try {
                    //                     const { data, status } = await updateUser(currentItem.id, newValues);
                    //                     if(status === 200) {
                    //                     const newData= [...users];
                    //                     const dataIndex = newData.findIndex(data => data.id === currentItem.id);
                    // newData[dataIndex] = data;
                    // setUsers([...newData]);
                    // toast.success("The record was successfully edited.");
                    //                 } else {
                    //     toast.error("Editing failed.");
                    //                 }
                    // showEditForm(false);
                    //             } catch (err) {
                    //     toast.error("Editing failed.");
                    //             }
                    //         }}
                    onFinishFailed={err => toast.error("Please complete all fields correctly.")}
                    autoComplete="off"
                >
                    <Tag className='mb-4 p-2'>Email: {currentItem.email}</Tag>
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
                        <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                        {" "}
                        <Button type="primary" htmlType="submit">Save Changes</Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
}

export default EditUser;