import { Button, Form, Input, Select, Switch } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import SearchInput from '../../../../utils/SearchInput';
import { Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAppContentTypes } from '../../../../hooks/useAppContentTypes';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { addInnerItem, addItem, removeInnerItem } from '../../../../store/entities/adminActions';
import { useAppServices } from '../../../../hooks/useAppServices';

const { Option } = Select;

const CreateTabMenu = () => {

    const contentTypes = useAppContentTypes();
    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const service = useSliceService();
    const { innerItems: tabs } = useSliceSelector();

    const [typeOptions, setTypeOptions] = useState();
    const [client, setClient] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState('');
    const [contentType, setContentType] = useState(Object.values(contentTypes)[0]);
    const [tabContent, setTabContent] = useState({
        title: "",
        type: Object.values(contentTypes)[0].value,
        leftContent: 0,
        rightContent: 0
    })

    const [form] = Form.useForm();

    useEffect(() => {
        const options = [];
        for (const key in contentTypes) {
            options.push({
                title: contentTypes[key].title,
                value: contentTypes[key].value,
                service: contentTypes[key].service
            });
        }
        setTypeOptions(options);

    }, [])

    const handleChangeType = (value) => {
        setContentType(typeOptions.find(type => type.value === value));
        setTabContent({ ...tabContent, type: value, content_leftt: 0, content_Right: 0 });
        form.setFieldsValue({ content_leftt: 0, content_Right: 0 });
    }

    const handleResetTab = () => {
        setShowAddForm(false);
        setClient([]);
        setTabContent({
            title: "",
            type: Object.values(contentTypes)[0].value,
            leftContent: 0,
            rightContent: 0
        });

        form.setFieldsValue({
            tab_title: "",
            type: Object.values(contentTypes)[0].value,
            leftContent: 0,
            rightContent: 0
        });

        setError('');
    }

    const handleTabTitleChange = (e) => {
        setTabContent({ ...tabContent, title: e.target.value });
        setError('');
    }

    const handleNewTab = async () => {

        if (tabContent.title === '') {
            setError("Tab Title is required");
            toast.error("Please Enter the tab title!");
        } else {
            const result = await dispatch(addInnerItem(actions, {
                title: tabContent.title,
                type: tabContent.type,
                content: contentType.value === contentTypes.client.value ? [...client.map(c => c.value.toString())] : [tabContent.leftContent, tabContent.rightContent],
                date: Date.now()
            }, services.tabs.createItem));

            if (result?.payload) {
                handleResetTab();
            }
        }
    }

    const handleDeleteTab = index => dispatch(removeInnerItem(actions, tabs[index].id, services.tabs.deleteItem));

    return (
        <Form
            form={form}
            name="add-tab-menu"
            layout="vertical"
            initialValues={{ type: Object.values(contentTypes)[0].value, status: true }}
            onFinish={value => dispatch(addItem(actions, { title: value.title, tabs: tabs.map(tab => tab.id), status: value.status, date: Date.now() }, service.createItem))}
            onFinishFailed={err => toast.error("Please complete all fields correctly.")}
            autoComplete="off"
        >

            <Form.Item
                label="Tab Menu Title"
                name="title"
                rules={[{ required: true, message: 'Title is required!' }]}
            >
                <Input />
            </Form.Item>


            <h5>Tabs</h5>
            {
                tabs.map((tab, index) =>
                    <Card bg="light" className='mb-3' key={index}>
                        <Card.Body className='d-flex flex-row'>
                            <div className='me-auto'>{tab.title}</div>
                            <div>
                                {/* <Button type="link">Edit</Button> */}
                                <Button danger type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteTab(index)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                )
            }
            {showAddForm ? (
                <>
                    <Row>
                        <Col sm={6}>
                            <Form.Item
                                label="Tab Title"
                                name="tab_title"
                                onChange={handleTabTitleChange}
                                rules={[{ required: true, message: 'Title is required!' }]}
                            >
                                <Input onChange={e => setTabContent({ ...tabContent, title: e.target.value })} />
                                <div className='text-danger'>{error}</div>
                            </Form.Item>
                        </Col>
                        <Col sm={6}>
                            <Form.Item name="type" label="Select a Content Type">
                                <Select
                                    placeholder="Select a Content Type"
                                    onChange={(value) => handleChangeType(value)}
                                    allowClear
                                    onSelect={value => {
                                        console.log("selected")
                                        setTabContent({ ...tabContent, type: value })
                                    }
                                    }
                                >
                                    {typeOptions.map((item, index) => <Option key={index} value={item.value}>{item.title}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        {
                            contentType.value === contentTypes.client.value ? (
                                <Col sm={12}>
                                    <Form.Item
                                        label={`Select ${contentType.title}s`}
                                        name="content_left"
                                    >
                                        <DebounceSelect
                                            mode="multiple"
                                            allowClear
                                            value={client}
                                            placeholder="Select users"
                                            service={contentType.service}
                                            onChange={(newValue) => {
                                                setClient(newValue);
                                            }}
                                            onSelect={client => setTabContent({ ...tabContent, leftContent: client.value })}

                                        />
                                    </Form.Item>
                                </Col>
                            ) : (
                                <>
                                    <Col sm={6}>
                                        <Form.Item
                                            label={`Select a ${contentType.title} for Left Column`}
                                            name="content_left"
                                        >
                                            <SearchInput
                                                placeholder="search a title"
                                                service={contentType.service}
                                                onSelect={value => setTabContent({ ...tabContent, leftContent: value })}
                                                contentType={contentType}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col sm={6}>
                                        <Form.Item
                                            label={`Select a ${contentType.title} for Right Column`}
                                            name="content_Right"
                                        >

                                            <SearchInput
                                                placeholder="search a title"
                                                service={contentType.service}
                                                onSelect={value => setTabContent({ ...tabContent, rightContent: value })}
                                                contentType={contentType}
                                            />

                                        </Form.Item>
                                    </Col>
                                </>
                            )
                        }

                    </Row>

                    <Form.Item>
                        <Button onClick={() => handleResetTab()}>Cancel</Button>
                        {" "}
                        <Button type="primary" danger onClick={() => handleNewTab()}>Add</Button>
                    </Form.Item>
                </>
            ) : (
                <Form.Item>
                    <Button icon={<PlusOutlined />} onClick={() => setShowAddForm(true)}>Add New Tab</Button>
                </Form.Item>

            )}

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

export default CreateTabMenu;