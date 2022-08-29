
import { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { getAllEvents, updateTimeline } from '../../../../services/eventServices';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../context/SliceProvider';
import { editItem, getInnerItems } from '../../../../store/entities/adminActions';

const EditTimeline = () => {

    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem, innerItems, loadingInnerItems} = useSliceSelector();

    const fetchEvents = async (eventTitle) => {

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

    useEffect(() => {
        dispatch(getInnerItems(actions, currentItem.events, getAllEvents));
        
    }, [dispatch, actions, currentItem]);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Edit Timeline"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.editFormCanceled}
            />

            {loadingInnerItems ? <div>Loading ...</div>
                : (
                    <Form
                        form={form}
                        name="add-event"
                        layout="vertical"
                        initialValues={{ ...currentItem, events: innerItems }}
                        onFinish={value => dispatch(editItem(actions, {
                            id: currentItem.id,
                            ...value,
                            events: value.events.map(event => event.value)
                        }, updateTimeline))
                        }
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
                                fetchOptions={fetchEvents}
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
                            <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
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