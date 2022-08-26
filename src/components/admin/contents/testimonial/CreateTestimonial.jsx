import { Button, Form, Input, Switch, InputNumber } from 'antd';
import { createTestimonial } from '../../../../services/themeServices';
import { useContext, useState } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';

const CreateTestimonial = ({ showCreateForm }) => {

    const [fileId, setfileId] = useState();
    const { testimonials, setTestimonials } = useContext(adminContext)

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Create Testimonial" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-Testimonial"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        image: fileId,
                        date: Date.now()
                    }
                    try {
                        const { data, status } = await createTestimonial(newValue);
                        if (status === 201) {
                            setTestimonials([...testimonials, data]);
                            toast.success("Record added successfully.");
                        } else {
                            toast.error("An error occurred creating the record.");
                        }
                        showCreateForm(false);
                    } catch (err) {
                        toast.error("An error occurred creating the record.")
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
                    <Button type="primary" htmlType="submit">Create Testimonial</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateTestimonial;