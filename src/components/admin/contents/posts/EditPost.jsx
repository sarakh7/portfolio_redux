import { Button, Form, Input, Select, Switch } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useAppServices } from '../../../../hooks/useAppServices';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem, getAllInnerItems } from '../../../../store/entities/adminActions';

const { Option } = Select;

const EditPost = () => {

    const [fileId, setfileId] = useState();

    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const { innerItems: cats, currentItem } = useSliceSelector();

    useEffect(() => {
        dispatch(getAllInnerItems(actions, services.cats.getAllItems));
    }, [dispatch, actions, services]);

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="edit-post"
            layout="vertical"
            initialValues={{ ...currentItem }}
            onFinish={async (value) => {
                dispatch(editItem(actions, {
                    ...value,
                    id: currentItem.id,
                    image: fileId ? fileId : currentItem.image,
                }, service.updateItem))
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
                <UploadFile fileId={currentItem.image} setFileId={setfileId} />
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
                <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">Save Changes</Button>
            </Form.Item>
        </Form>
    );
}

export default EditPost;