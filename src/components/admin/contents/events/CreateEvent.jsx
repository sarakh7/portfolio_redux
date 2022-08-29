
import { Button, Form, Input, Switch } from 'antd';
import { createEvent } from '../../../../services/eventServices';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions } from '../../../../context/SliceProvider';
import { addItem } from './../../../../store/entities/adminActions';

const CreateEvent = ({ showCreateForm }) => {

    const dispatch = useDispatch();
    const actions = useSliceActions();

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Create Event"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.createFormCanceled}
            />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={value => dispatch(addItem(actions, value, createEvent))}
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
                    <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Event</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateEvent;