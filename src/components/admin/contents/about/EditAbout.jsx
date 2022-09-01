
import { Button, Form, Input, Switch, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem } from '../../../../store/entities/admin/adminActions';

const EditAbout = () => {

    const [bannerId, setBannerId] = useState();
    const [contactImgId, setContactImgId] = useState();
    const [headerLogoId, setHeaderLogoId] = useState();
    const [footerLogoId, setFooterLogoId] = useState();
    const [panelLogoId, setPanelLogoId] = useState();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();
    const service = useSliceService();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="add-about-section"
            layout="vertical"
            initialValues={{ ...currentItem }}
            onFinish={value => dispatch(editItem(actions, {
                id: currentItem.id,
                ...value,
                main_banner: bannerId ? bannerId : currentItem.main_banner,
                contact_image: contactImgId ? contactImgId : currentItem.contact_image,
                header_logo: headerLogoId ? headerLogoId : currentItem.header_logo,
                footer_logo: footerLogoId ? footerLogoId : currentItem.footer_logo,
                panel_logo: panelLogoId ? panelLogoId : currentItem.panel_logo,
            }, service.updateItem))}

            onFinishFailed={err => toast.error("Editing failed.")}
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

                <UploadFile fileId={currentItem.main_banner} setFileId={setBannerId} />
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
                <UploadFile fileId={currentItem.contact_image} setFileId={setContactImgId} />
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
                        <UploadFile fileId={currentItem.header_logo} setFileId={setHeaderLogoId} />
                    </Form.Item>
                </Col>
                <Col sm={4}>
                    <Form.Item
                        label="Footer Logo"
                        name="footer_logo"
                    >
                        <UploadFile fileId={currentItem.footer_logo} setFileId={setFooterLogoId} />
                    </Form.Item>
                </Col>
                <Col sm={4}>
                    <Form.Item
                        label="Panel Logo"
                        name="panel_logo"
                    >
                        <UploadFile fileId={currentItem.panel_logo} setFileId={setPanelLogoId} />
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
                <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">Save Changes</Button>
            </Form.Item>
        </Form>
    );
}

export default EditAbout;