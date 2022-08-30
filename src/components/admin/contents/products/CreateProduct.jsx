
import { Button, Form, Input, Switch, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/adminActions';

const CreateProduct = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-product"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions, { ...value, date: Date.now() }, service.createItem))}
            onFinishFailed={err => toast.error("Please complete all fields correctly.")}
            autoComplete="off"
        >

            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Title is required!' }]}
            >
                <Input />
            </Form.Item>

            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Sub-Title"
                        name="subtitle"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={6}>
                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'description is required!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.List name="features">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name]}
                                >
                                    <Input placeholder="Feature" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                Add Feature
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
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

export default CreateProduct;