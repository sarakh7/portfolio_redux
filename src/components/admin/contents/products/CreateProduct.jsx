
import { Button, Form, Input, Switch, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createProduct } from '../../../../services/productService';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateProduct = ({ showCreateForm }) => {

    const { products, setProducts } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create Product" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-product"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createProduct({ ...value, date: Date.now() });
                        if (status === 201) {
                            const newProducts = [...products, data];
                            setProducts(newProducts);
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Product</Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default CreateProduct;