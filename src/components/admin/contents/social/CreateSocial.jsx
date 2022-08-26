
import { Button, Form, Input, Switch } from 'antd';
import { createSocial } from '../../../../services/socialService';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateSocial = ({ showCreateForm }) => {

    const { socials, setSocials } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create Social Media" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-social"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createSocial({ ...value, date: Date.now() });
                        if (status === 201) {
                            setSocials([...socials, data]);
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

                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label="Icon"
                            name="icon"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Link"
                            name="link"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label="Publish"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateSocial;