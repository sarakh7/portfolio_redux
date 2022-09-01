
import { Form, Input, Button, Switch } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../../store/entities/admin/adminActions';
import { useSliceActions, useSliceService } from '../../../../../hooks/sliceHooks';

const CreateCat = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={value => dispatch(addItem(actions, value, service.createItem))}
                onFinishFailed={err => toast.error("Please complete all fields correctly.")}
            >
                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please enter the name of category!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label="Publish"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">{`Create ${service.name}`}</Button>
                </Form.Item>
            </Form>
    );
}

export default CreateCat;