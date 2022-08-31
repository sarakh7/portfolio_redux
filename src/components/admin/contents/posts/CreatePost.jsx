import { Button, Form, Input, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem, getAllInnerItems } from '../../../../store/entities/adminActions';
import { useAppServices } from '../../../../hooks/useAppServices';

const { Option } = Select;

const CreatePost = () => {

    const [fileId, setfileId] = useState();

    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const { innerItems: cats } = useSliceSelector();

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getAllInnerItems(actions, services.cats.getAllItems));
    }, [dispatch, actions, services]);

    return (
        <Form
            form={form}
            name="add-post"
            layout="vertical"
            onFinish={value => {
                dispatch(addItem(actions, {
                    ...value,
                    image: fileId,
                    date: Date.now()
                }, service.createItem));

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
                <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">{`Create ${service.name}`}</Button>
            </Form.Item>
        </Form>
    );
}

export default CreatePost;