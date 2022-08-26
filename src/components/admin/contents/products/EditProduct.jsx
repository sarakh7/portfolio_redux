
import { Button, Form, Input, Switch, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { updateProduct } from '../../../../services/productService';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditProduct = ({ currentData, showEditForm }) => {

    const { products, setProducts } = useContext(adminContext);

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Edit Product" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />
            <Form
                form={form}
                name="add-product"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await updateProduct(currentData.id, value);
                        if (status === 200) {
                            const newData = [...products];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setProducts([...newData]);
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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default EditProduct;