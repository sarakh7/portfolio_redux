
import { Button, Form, Input, Switch } from 'antd';
import { createClient } from '../../../../services/themeServices';
import { useContext, useState } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';

const CreateClient = ({ showCreateForm }) => {

    const [fileId, setfileId] = useState();
    const { clients, setClients } = useContext(adminContext)

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Create Client" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-client"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        image: fileId,
                        date: Date.now()
                    }
                    try {
                        const { data, status } = await createClient(newValue);
                        if (status === 201) {
                            setClients([...clients, data]);
                            toast.success("Record added successfully.");
                        } else {
                            toast.error("An error occurred creating the record.");
                        }
                        showCreateForm(false);
                    } catch (err) {
                        toast.error("An error occurred creating the record.");
                    }
                }}
                onFinishFailed={err => toast.error("Please complete all fields correctly.")}
                autoComplete="off"
            >

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Title is required!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Link"
                    name="link"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                >
                    <UploadFile setFileId={setfileId} />
                </Form.Item>
                <Form.Item
                    label="Publish"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Client</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateClient;