
import { Form, Input, Button, Switch } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editItem } from '../../../../../store/entities/admin/adminActions';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../../hooks/sliceHooks';
import { notificationSent } from '../../../../../store/ui/uiSlice';

const EditCat = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ ...currentItem }}
                onFinish={value => dispatch(editItem(actions, { id: currentItem.id, ...value }, service.updateItem))}
                onFinishFailed={err => dispatch(notificationSent({type: "error", message: "Please complete all fields correctly."}))}
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
                    <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
    );
}

export default EditCat;