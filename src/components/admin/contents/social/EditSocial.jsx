
import { Button, Form, Input, Switch } from 'antd';
import { updateSocial } from '../../../../services/socialService';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditSocial = ({ currentData, showEditForm }) => {

    const { socials, setSocials } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Edit Social Media" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-social"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await updateSocial(currentData.id, value);
                        if (status === 200) {
                            const newData = [...socials];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setSocials([...newData]);
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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditSocial;