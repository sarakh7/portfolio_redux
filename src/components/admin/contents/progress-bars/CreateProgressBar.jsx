
import { Button, Form, Input, Switch, InputNumber } from 'antd';
import { createProgressBar } from '../../../../services/progressBarService';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/adminActions';

const CreateProgressBar = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader
                title="Create Progress bar"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.createFormCanceled}
            />

            <Form
                form={form}
                name="add-progress-bar"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={value => dispatch(addItem(actions, { ...value, date: Date.now() }, createProgressBar))}
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
                    <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create ProgressBar</Button>
                </Form.Item>
            </Form>

        </>
    );
}

export default CreateProgressBar;