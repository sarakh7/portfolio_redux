
import { Button, Form, Input, Switch, InputNumber } from 'antd';
import { updateProgressBar } from '../../../../services/progressBarService';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditProgressBar = ({ currentData, showEditForm }) => {

    const { progressBars, setProgressBars } = useContext(adminContext);

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Edit Progress bar" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-progress-bar"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await updateProgressBar(currentData.id, value);

                        if (status === 200) {
                            const newData = [...progressBars];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setProgressBars([...newData]);
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
                            label="Score"
                            name="score"
                        >
                            <InputNumber />
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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditProgressBar;