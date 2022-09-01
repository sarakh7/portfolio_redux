import { Form, Input, Button, Switch } from 'antd';
import SearchInput from '../../../../utils/SearchInput';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAppServices } from '../../../../hooks/useAppServices';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/admin/adminActions';

const CreatePricing = () => {

    const [tabMenu, setTabMenu] = useState([]);

    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-pricing"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions, { ...value, tab_menu: tabMenu }, service.createItem))}
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
                        label={`Select a Tab Menu`}
                        name="tab_menu"
                    >
                        <SearchInput
                            placeholder="search a title"
                            service={services.tabMenues}
                            onSelect={value => setTabMenu(value)}
                        />
                    </Form.Item>
                </Col>
            </Row>

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

export default CreatePricing;