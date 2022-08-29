
import { Button, Form, Input, Switch } from 'antd';
import { updateEvent } from '../../../../services/eventServices';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../context/SliceProvider';
import { editItem } from '../../../../store/entities/adminActions';

const EditEvent = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Edit Event"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.editFormCanceled}
            />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ ...currentItem }}
                onFinish={value => dispatch(editItem(actions, { id: currentItem.id, ...value }, updateEvent))}
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
                    <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditEvent;