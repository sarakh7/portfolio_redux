
import { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { createTimeline, getAllEvents } from '../../../../services/eventServices';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/adminActions';

const CreateTimeline = () => {

    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    const actions = useSliceActions();

    const fetchData = async (eventTitle) => {

        let events = [];
        try {
            const { data, status } = await getAllEvents()
            if (status === 200) {
                events = data.filter(event => {
                    return event.title.toLowerCase().includes(eventTitle.toLowerCase());
                });
            }

        } catch (err) {
            toast.error("There was an error receiving data.");
        }

        return events.map(event => ({
            label: event.title,
            value: event.id,
        }));
    }


    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Create Timeline"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.createFormCanceled}
            />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={value => dispatch(addItem(actions, { ...value, events: value.events?.map(event => event.value) }, createTimeline))}
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
                            label="Subtitle"
                            name="subtitle"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Select Events"
                    name="events"
                >
                    <DebounceSelect
                        mode="multiple"
                        allowClear
                        value={value}
                        placeholder="Select users"
                        fetchOptions={fetchData}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}

                    />

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
                    <Button type="primary" htmlType="submit">Create Timeline</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateTimeline;