import { Button, Form, Input, Select, Switch } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCats } from '../../../../store/entities/admin/post/postsActions';
import { editPost } from './../../../../store/entities/admin/post/postsActions';
import { editPostCanceled } from '../../../../store/entities/admin/post/postsSlice';

const { Option } = Select;

const EditPost = () => {

    const [fileId, setfileId] = useState();

    const dispatch = useDispatch();
    const { cats, currentPost } = useSelector(state => state.entities.admin.posts);

    useEffect(() => {
        dispatch(getCats());

    }, [dispatch]);


    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Edit Post"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={editPostCanceled}
            />

            <Form
                form={form}
                name="add-post"
                layout="vertical"
                initialValues={{ ...currentPost }}
                onFinish={async (value) => {
                    dispatch(editPost({
                        ...value,
                        id: currentPost.id,
                        image: fileId ? fileId : currentPost.image,
                    }))
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
                    <UploadFile fileId={currentPost.image} setFileId={setfileId} />
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
                    <Button onClick={() => dispatch(editPostCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditPost;