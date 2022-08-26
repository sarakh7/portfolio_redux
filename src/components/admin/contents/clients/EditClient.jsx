
import { Button, Form, Input, Switch } from 'antd';
import { deleteFile, updateClient } from '../../../../services/themeServices';
import { useContext, useState, useRef, useEffect } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';

const EditClient = ({ currentData, showEditForm }) => {

    const [fileId, setfileId] = useState();
    const { clients, setClients } = useContext(adminContext)
    const prevImageRef = useRef();
    const [form] = Form.useForm();

    useEffect(() => {
        const deletePrevFile = async () => {
            try {
                if (prevImageRef.current) {
                    //if the image changed, delete the previous image
                    await deleteFile(prevImageRef.current);
                }
                prevImageRef.current = fileId;
            } catch (err) {
                toast.error("Failed to delete image.");
            }

        }
        deletePrevFile();
    }, [fileId])

    return (
        <>
            <ContentHeader title="Edit Client" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-client"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        image: fileId ? fileId : currentData.image,
                    }
                    try {
                        const { data, status } = await updateClient(currentData.id, newValue);
                        if (status === 200) {
                            const newData = [...clients];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setClients([...newData]);
                            toast.success("The record was successfully edited.");
                            //if the image changed, delete the previous image from DB
                            if (fileId) {
                                await deleteFile(currentData.image);
                            }
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
                    <UploadFile fileId={currentData.image} setFileId={setfileId} />
                </Form.Item>                
                <Form.Item
                    label="Publish"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditClient;