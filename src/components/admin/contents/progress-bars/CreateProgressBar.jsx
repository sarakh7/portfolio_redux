
import { Button, Form, Input, Switch, InputNumber } from 'antd';
import { createProgressBar } from '../../../../services/progressBarService';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateProgressBar = ({ showCreateForm }) => {

    const { progressBars, setProgressBars } = useContext(adminContext);

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Create Progress bar" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-progress-bar"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createProgressBar({ ...value, date: Date.now() });
                        if (status === 201) {
                            const newProgressBars = [...progressBars, data];
                            setProgressBars(newProgressBars);
                            toast.success("Record added successfully.");
                        } else {
                            toast.error("An error occurred creating the record.");
                        }
                        showCreateForm(false);
                        form.resetFields();
                    } catch (err) {
                        toast.error("An error occurred creating the record.");
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create ProgressBar</Button>
                </Form.Item>
            </Form>

        </>
    );
}

export default CreateProgressBar;