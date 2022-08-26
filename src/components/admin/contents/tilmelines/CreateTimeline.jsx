
import { useState, useContext } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { createTimeline, getAllEvents } from '../../../../services/eventServices';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateTimeline = ({ showCreateForm }) => {

    const [value, setValue] = useState([]);

    const { timelines, setTimelines } = useContext(adminContext);

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
            <ContentHeader title="Create Timeline" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createTimeline({ ...value, events: value.events?.map(event => event.value) });

                        if (status === 201) {
                            const newTimelines = [...timelines, data];
                            setTimelines(newTimelines);
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Timeline</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateTimeline;