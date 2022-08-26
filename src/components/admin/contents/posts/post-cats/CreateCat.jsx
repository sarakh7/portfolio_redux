
import { useContext } from 'react';
import { adminContext } from '../../../../../context/adminContext';
import { createGroup } from '../../../../../services/postService';
import { Form, Input, Button, Switch } from 'antd';
import ContentHeader from '../../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateCat = ({ showCreateForm }) => {

    const { cats, setCats } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create New Category" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createGroup(value);
                        if (status === 201) {
                            const newCats = [...cats, data];
                            setCats(newCats);
                            showCreateForm(prevValue => !prevValue);
                            toast.success("Record added successfully.");
                        } else {
                            toast.error("An error occurred creating the record.");
                        }
                        form.resetFields();
                    } catch (err) {
                        toast.error("An error occurred creating the record.");
                    }
                }}
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Category</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateCat;