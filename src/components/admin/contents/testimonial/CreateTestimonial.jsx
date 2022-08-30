import { Button, Form, Input, Switch, InputNumber } from 'antd';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/adminActions';

const CreateTestimonial = ({ showCreateForm }) => {

    const [fileId, setfileId] = useState();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-Testimonial"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions,
                {
                    ...value,
                    image: fileId,
                    date: Date.now()
                }, service.createItem))}

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
                        label="Client Name"
                        name="client_name"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Client Job"
                        name="client_job"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={6}>
                    <Form.Item
                        label="Company Name"
                        name="company"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Image"
                name="image"
            >
                <UploadFile setFileId={setfileId} />
            </Form.Item>
            <Form.Item
                label="score"
                name="score"
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'description is required!' }]}
            >
                <Input.TextArea />
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
                <Button type="primary" htmlType="submit">{`Create ${service.name}`}</Button>
            </Form.Item>
        </Form >
    );
}

export default CreateTestimonial;