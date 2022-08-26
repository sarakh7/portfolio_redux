import { Button, Form, Input, Select, Switch } from 'antd';
import { getAllGroups, updatePost } from '../../../../services/postService';
import { useEffect, useState, useContext, useRef } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { ArrowLeftOutlined } from '@ant-design/icons';

import ContentHeader from '../content-header/ContentHeader';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { deleteFile } from '../../../../services/themeServices';
import { toast } from 'react-toastify';

const { Option } = Select;

const EditPost = ({ currentPostData, showEditForm }) => {

    const [fileId, setfileId] = useState();
    const [cats, setCats] = useState([]);
    const { posts, setPosts } = useContext(adminContext);
    const prevImageRef = useRef();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: groupsData, status: groupStatus } = await getAllGroups();
                if (groupStatus === 200) {
                    setCats(groupsData.filter(d => d.status === true));
                }

            } catch (err) {
                toast.error("There was an error receiving data.");
            }
        }
        fetchData();
    }, []);

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
            <ContentHeader title="Edit Post" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-post"
                layout="vertical"
                initialValues={{ ...currentPostData }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        image: fileId ? fileId : currentPostData.image,
                    }
                    try {
                        const { data, status } = await updatePost(currentPostData.id, newValue);
                        if (status === 200) {
                            const newPosts = [...posts];
                            const postIndex = newPosts.findIndex(post => post.id === currentPostData.id);
                            newPosts[postIndex] = data;
                            setPosts([...newPosts]);
                            toast.success("The record was successfully edited.");
                            //if the image changed, delete the previous image from DB
                            if (fileId) {
                                await deleteFile(currentPostData.image);
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
                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Subtitle"
                            name="subtitle"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label="Short Title"
                            name="short_title"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Abstract"
                    name="abstract"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                >
                    <UploadFile fileId={currentPostData.image} setFileId={setfileId} />
                </Form.Item>
                <Form.Item
                    label="Icon"
                    name="icon"
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="cat"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select placeholder="select category">
                        {cats.map((cat, index) => <Option key={index} value={cat.id}>{cat.title}</Option>)}
                    </Select>
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

export default EditPost;