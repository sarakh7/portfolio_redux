
import { Button, Form, Input, Switch, Space, InputNumber, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { updateAbout } from '../../../../services/themeServices';
import { useContext, useState } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import {toast} from 'react-toastify';

const EditAbout = ({ currentData, showEditForm }) => {

    const [bannerId, setBannerId] = useState();
    const [contactImgId, setContactImgId] = useState();
    const [headerLogoId, setHeaderLogoId] = useState();
    const [footerLogoId, setFooterLogoId] = useState();
    const [panelLogoId, setPanelLogoId] = useState();

    const { abouts, setAbouts } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Edit General Settings" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-about-section"
                layout="vertical"
                initialValues={{ ...currentData }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        main_banner: bannerId ? bannerId : currentData.main_banner,
                        contact_image: contactImgId ? contactImgId : currentData.contact_image,
                        header_logo: headerLogoId ? headerLogoId : currentData.header_logo,
                        footer_logo: footerLogoId ? footerLogoId : currentData.footer_logo,
                        panel_logo: panelLogoId ? panelLogoId : currentData.panel_logo,
                    }
                    try {
                        const { data, status } = await updateAbout(currentData.id, newValue);
                        if (status === 200) {
                            const newData = [...abouts];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setAbouts([...newData]);
                            toast.success("The record was successfully edited");
                        } else {
                            toast.error("Editing failed.");
                        }
                        showEditForm(false);
                    } catch (err) {
                        toast.error("Editing failed.");
                    }
                }}
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

                    <UploadFile fileId={currentData.main_banner} setFileId={setBannerId} />
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
                    <UploadFile fileId={currentData.contact_image} setFileId={setContactImgId} />
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
                            <UploadFile fileId={currentData.header_logo} setFileId={setHeaderLogoId} />
                        </Form.Item>
                    </Col>
                    <Col sm={4}>
                        <Form.Item
                            label="Footer Logo"
                            name="footer_logo"
                        >
                            <UploadFile fileId={currentData.footer_logo} setFileId={setFooterLogoId} />
                        </Form.Item>
                    </Col>
                    <Col sm={4}>
                        <Form.Item
                            label="Panel Logo"
                            name="panel_logo"
                        >
                            <UploadFile fileId={currentData.panel_logo} setFileId={setPanelLogoId} />
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
                    <Button onClick={() => showEditForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Save Changes</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditAbout;