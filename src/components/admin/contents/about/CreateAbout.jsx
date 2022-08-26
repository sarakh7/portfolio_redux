
import { Button, Form, Input, Switch, Space, InputNumber, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createAbout } from '../../../../services/themeServices';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import UploadFile from '../../../../utils/upload/UploadFile';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateAbout = ({ showCreateForm }) => {

    const [bannerId, setBannerId] = useState();
    const [contactImgId, setContactImgId] = useState();
    const [headerLogoId, setHeaderLogoId] = useState();
    const [footerLogoId, setFooterLogoId] = useState();
    const [panelLogoId, setPanelLogoId] = useState();
    
    const { abouts, setAbouts } = useContext(adminContext);

    const [form] = Form.useForm();

    return (
        <>
            <ContentHeader title="Create General Settings" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-about-section"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    const newValue = {
                        ...value,
                        main_banner: bannerId,
                        contact_image: contactImgId,
                        header_logo: headerLogoId,
                        footer_logo: footerLogoId,
                        panel_logo: panelLogoId,
                        date: Date.now()
                    }
                    try {
                        const { data, status } = await createAbout(newValue);
                        if (status === 201) {
                            setAbouts([...abouts, data]);
                            toast.success("Record added successfully.");

                        } else {
                            toast.error("An error occurred creating the record.");
                        }
                        showCreateForm(false);
                    } catch (err) {
                        toast.error("An error occurred creating the record.");
                    }
                }}
                onFinishFailed={err => toast.error("Please complete all fields correctly.")}
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateAbout;