
import { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/admin/adminActions';
import { useAppServices } from '../../../../hooks/useAppServices';
import { notificationSent } from '../../../../store/ui/uiSlice';

const CreateTimeline = () => {

    const services = useAppServices();

    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();


    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-timeline"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions, { ...value, events: value.events?.map(event => event.value) }, service.createItem))}
            onFinishFailed={err => dispatch(notificationSent({type: "error", message: "Please complete all fields correctly."}))}
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
                <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">{`Create ${service.name}`}</Button>
            </Form.Item>
        </Form>
    );
}

export default CreateTimeline;