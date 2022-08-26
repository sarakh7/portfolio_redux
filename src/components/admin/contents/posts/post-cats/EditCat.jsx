
import { useContext } from 'react';
import { adminContext } from '../../../../../context/adminContext';
import { updateGroup } from '../../../../../services/postService';
import { Form, Input, Button, Switch } from 'antd';
import ContentHeader from '../../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditCat = ({ currentData, showEditForm }) => {

    const { cats, setCats } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create New Category" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await updateGroup(currentData.id, value);
                        if (status === 200) {
                            const newData = [...cats];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setCats([...newData]);
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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditCat;