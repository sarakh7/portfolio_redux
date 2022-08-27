import { Button, Form, Input, Select, Switch } from 'antd';
import { getAllGroups, createPost } from '../../../../services/postService';
import { useEffect, useState, useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getCats } from '../../../../store/admin/post/postsActions';
import { addPostCanceled } from '../../../../store/admin/post/postsSlice';

const { Option } = Select;

const CreatePost = () => {

    const [fileId, setfileId] = useState();

    const dispatch = useDispatch();
    const cats = useSelector(state => state.posts.cats);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getCats());
    }, [dispatch]);

    return (
        <>
            <ContentHeader title="Create New Posts" icon={<ArrowLeftOutlined />} btnTitle="Back" action={addPostCanceled} />

            <Form
                form={form}
                name="add-post"
                layout="vertical"
                onFinish={(value) => {

                    dispatch(addPost({
                        ...value,
                        image: fileId,
                        date: Date.now()
                    }));

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
                    <Button onClick={() => dispatch(addPostCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Post</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreatePost;