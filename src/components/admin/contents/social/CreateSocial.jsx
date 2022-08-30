
import { Button, Form, Input, Switch } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/adminActions';

const CreateSocial = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-social"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions, value, service.createItem))}
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
                        label="Icon"
                        name="icon"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Link"
                        name="link"
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
                <Button type="primary" htmlType="submit">Create</Button>
            </Form.Item>
        </Form>
    );
}

export default CreateSocial;