
import { useState, useContext } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { getAllEvents, updateTimeline } from '../../../../services/eventServices';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditTimeline = ({ currentData, showEditForm }) => {

    const [value, setValue] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const getEvents = async () => {
        try {
            const { data, status } = await getAllEvents()
            if (status === 200) {
                const filteredEvents = data.filter(event => currentData.events?.includes(event.id));
                const newEvents = filteredEvents.map(event => ({
                    label: event.title,
                    value: event.id,
                }));
                setCurrentEvents(newEvents);
                setIsLoading(false);
            }

        } catch (err) {
            toast.error("There was an error receiving events.");
        }
    }
    useEffect(() => {
        getEvents();
    }, []);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Edit Timeline" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />
            {isLoading ? <div>Loading ...</div>
                : (
                    <Form
                        form={form}
                        name="add-event"
                        layout="vertical"
                        initialValues={{ ...currentData, events: currentEvents }}
                        onFinish={async (value) => {
                            const newValues = { ...value, events: value.events.map(event => event.value) };
                            try {
                                const { data, status } = await updateTimeline(currentData.id, newValues);
                                if (status === 200) {
                                    const newData = [...timelines];
                                    const dataIndex = newData.findIndex(data => data.id === currentData.id);
                                    newData[dataIndex] = data;
                                    setTimelines([...newData]);
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
                            <Button onClick={() => showEditForm(false)}>Cancel</Button>
                            {" "}
                            <Button type="primary" htmlType="submit">Save Changes</Button>
                        </Form.Item>
                    </Form>
                )

            }

        </>
    );
}

export default EditTimeline;