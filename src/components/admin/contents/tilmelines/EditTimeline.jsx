
import { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem, getInnerItems } from '../../../../store/entities/admin/adminActions';
import { useAppServices } from '../../../../hooks/useAppServices';

const EditTimeline = () => {

    const [value, setValue] = useState([]);

    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem, innerItems, loadingInnerItems } = useSliceSelector();
    const service = useSliceService();


    useEffect(() => {
        dispatch(getInnerItems(actions, currentItem.events, services.events.getAllItems));

    }, [dispatch, actions, currentItem, services]);

    const [form] = Form.useForm();

    return (
        <>
            {loadingInnerItems ? <div>Loading ...</div>
                : (
                    <Form
                        form={form}
                        name="edit-timeline"
                        layout="vertical"
                        initialValues={{
                            ...currentItem,
                            events: innerItems.map(item => ({
                                label: item.title,
                                value: item.id,
                            }))
                        }}
                        onFinish={value => dispatch(editItem(actions, {
                            id: currentItem.id,
                            ...value,
                            events: value.events.map(event => event.value)
                        }, service.updateItem))
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
                                service={services.events}
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