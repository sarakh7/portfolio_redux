
import { createGroup } from '../../../../../services/postService';
import { Form, Input, Button, Switch } from 'antd';
import ContentHeader from '../../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../../../store/entities/adminActions';
import { useSliceActions } from '../../../../../context/SliceProvider';

const CreateCat = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Create New Category"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.createFormCanceled}
            />

            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    dispatch(addItem({
                        actions,
                        item: value,
                        createItemFunc: createGroup
                    }))
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
                    <Button onClick={() => dispatch(actions.createFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Category</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateCat;