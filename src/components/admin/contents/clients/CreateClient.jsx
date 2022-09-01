
import { Button, Form, Input, Switch } from 'antd';
import { useState } from 'react';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/admin/adminActions';

const CreateClient = () => {

    const [fileId, setfileId] = useState();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-client"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={async (value) => dispatch(addItem(actions, {
                ...value,
                image: fileId,
                date: Date.now()
            }, service.createItem))}

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
            <Form.Item
                label="Link"
                name="link"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
            >
                <UploadFile setFileId={setfileId} />
            </Form.Item>
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
                <Button type="primary" htmlType="submit">{`Create ${service.name}`}</Button>
            </Form.Item>
        </Form>
    );
}

export default CreateClient;