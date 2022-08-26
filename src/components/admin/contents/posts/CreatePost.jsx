import { Button, Form, Input, Select, Switch } from 'antd';
import { getAllGroups, createPost } from '../../../../services/postService';
import { useEffect, useState, useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';

const { Option } = Select;

const CreatePost = ({ showCreateForm }) => {

    const [fileId, setfileId] = useState();
    const [cats, setCats] = useState([]);
    const { posts, setPosts } = useContext(adminContext);

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

    return (
        <>
            <ContentHeader title="Create New Posts" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-post"
                layout="vertical"
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        image: fileId,
                        date: Date.now()
                    }
                    try {
                        const { data, status } = await createPost(newValue);
                        if (status === 201) {
                            const newPosts = [...posts, data];
                            setPosts(newPosts);
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
                    <UploadFile setFileId={setfileId} />
                </Form.Item>
                <Form.Item
                    label="Icon"
                    name="icon"
                >
                    <Input />
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Post</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreatePost;