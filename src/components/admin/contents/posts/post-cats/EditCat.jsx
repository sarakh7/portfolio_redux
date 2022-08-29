
import { updateGroup } from '../../../../../services/postService';
import { Form, Input, Button, Switch } from 'antd';
import ContentHeader from '../../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editItem } from '../../../../../store/entities/adminActions';
import { useSliceActions, useSliceSelector } from '../../../../../hooks/sliceHooks';

const EditCat = () => {

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader
                title="Edit New Category"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.editFormCanceled}
            />

            <Form
                form={form}
                name="add-group"
                layout="vertical"
                initialValues={{ ...currentItem }}
                onFinish={value => dispatch(editItem(actions, { id: currentItem.id, ...value }, updateGroup))}
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
                    <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditCat;