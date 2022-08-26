
import { Button, Form, Input, Switch } from 'antd';
import styles from './event.module.css';
import { createEvent } from '../../../../services/eventServices';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import {Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateEvent = ({ showCreateForm }) => {

    const { events, setEvents } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create Event" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createEvent({ ...value, date: Date.now() });
                        if (status === 201) {
                            const newEvents = [...events, data];
                            setEvents(newEvents);
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
                className={styles.addContentForm}
            >

                <Form.Item
                    label="Title"
                    name="title"
                    className={styles.formItem}
                    rules={[{ required: true, message: 'Title is required!' }]}
                >
                    <Input />
                </Form.Item>

                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Subtitle"
                            name="subtitle"
                            className={styles.formItem}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label="score"
                            name="score"
                            className={styles.formItem}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Description"
                    name="description"
                    className={styles.formItem}
                    rules={[{ required: true, message: 'description is required!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Publish"
                    name="status"
                    valuePropName="checked"
                    className={styles.formItem}
                >
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Event</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateEvent;