
import { Button, Form, Input, Switch } from 'antd';
import { updateEvent } from '../../../../services/eventServices';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditEvent = ({ currentData, showEditForm }) => {

    const { events, setEvents } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Edit Event" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await updateEvent(currentData.id, value);
                        if (status === 200) {
                            const newData = [...events];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setEvents([...newData]);
                            toast.success("The record was successfully edited.");
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
                            label="score"
                            name="score"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditEvent;