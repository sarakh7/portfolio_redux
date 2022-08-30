
import { Button, Form, Input, Switch } from 'antd';
import { useState } from 'react';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem } from '../../../../store/entities/adminActions';

const EditClient = () => {

    const [fileId, setfileId] = useState();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-client"
            layout="vertical"
            initialValues={{ ...currentItem }}
            onFinish={value => dispatch(editItem(actions, {
                id: currentItem.id,
                ...value,
                image: fileId ? fileId : currentItem.image,
            }, service.updateItem))}

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
                <UploadFile fileId={currentItem.image} setFileId={setfileId} />
            </Form.Item>
            <Form.Item
                label="Publish"
                name="status"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">Save Changes</Button>
            </Form.Item>
        </Form>
    );
}

export default EditClient;