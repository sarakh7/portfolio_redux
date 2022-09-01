
import { Button, Form, Input, Switch, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceService } from '../../../../hooks/sliceHooks';
import { addItem } from '../../../../store/entities/admin/adminActions';
import { notificationSent } from '../../../../store/ui/uiSlice';

const CreateAbout = () => {

    const [bannerId, setBannerId] = useState();
    const [contactImgId, setContactImgId] = useState();
    const [headerLogoId, setHeaderLogoId] = useState();
    const [footerLogoId, setFooterLogoId] = useState();
    const [panelLogoId, setPanelLogoId] = useState();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-about-section"
            layout="vertical"
            initialValues={{ status: true }}
            onFinish={value => dispatch(addItem(actions, {
                ...value,
                main_banner: bannerId,
                contact_image: contactImgId,
                header_logo: headerLogoId,
                footer_logo: footerLogoId,
                panel_logo: panelLogoId,
                date: Date.now()
            }, service.createItem))}

            onFinishFailed={err => dispatch(notificationSent({type: "error", message: "Please complete all fields correctly."}))}
            autoComplete="off"
        >

            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter the title!' }]}
            >
                <Input />
            </Form.Item>

            <h5 className='mb-4 mt-5'>About Section</h5>

            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={6}>
                    <Form.Item
                        label="Sub-Title"
                        name="subtitle"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Main Banner"
                name="main_banner"
            >
                <UploadFile setFileId={setBannerId} />
            </Form.Item>

            <Form.Item
                label="Main Description"
                name="main_description"
                rules={[{ required: true, message: 'description is required!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.List name="jobs">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name]}
                                >
                                    <Input placeholder="Job" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                Add Job
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Divider />
            <h5 className='mb-4 mt-5'>Contact Section</h5>
            <Row>
                <Col sm={6}>
                    <Form.Item
                        label="Contact Part Title"
                        name="contact_title"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={6}>
                    <Form.Item
                        label="Contact Part Sub-Title"
                        name="contact_subtitle"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Contact Part Image"
                name="contact_image"
            >
                <UploadFile setFileId={setContactImgId} />
            </Form.Item>

            <Form.Item
                label="Contact Part Description"
                name="contact_description"
            >
                <Input.TextArea />
            </Form.Item>

            <Divider />
            <h5 className='mb-4 mt-5'>General</h5>

            <Form.Item
                label="Site Title"
                name="site_title"
            >
                <Input />
            </Form.Item>
            <Row>
                <Col sm={4}>
                    <Form.Item
                        label="Header Logo"
                        name="header_logo"
                    >
                        <UploadFile setFileId={setHeaderLogoId} />
                    </Form.Item>
                </Col>
                <Col sm={4}>
                    <Form.Item
                        label="Footer Logo"
                        name="footer_logo"
                    >
                        <UploadFile setFileId={setFooterLogoId} />
                    </Form.Item>
                </Col>
                <Col sm={4}>
                    <Form.Item
                        label="Panel Logo"
                        name="panel_logo"
                    >
                        <UploadFile setFileId={setPanelLogoId} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="CopyRighte"
                name="copyright"
            >
                <Input />
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
                <Button type="primary" htmlType="submit">Create</Button>
            </Form.Item>
        </Form >
    );
}

export default CreateAbout;