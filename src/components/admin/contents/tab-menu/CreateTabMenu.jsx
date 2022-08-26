import { Button, Form, Input, Select } from 'antd';
import { createTab, createTabMenu, deleteTab } from '../../../../services/tabMenuService';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getAllProgressBarLists } from '../../../../services/progressBarService';
import { getAllTimelines } from '../../../../services/eventServices';
import { getAllPosts } from '../../../../services/postService';
import SearchInput from '../../../../utils/SearchInput';
import { Card } from 'react-bootstrap';
import { getAllProducts } from '../../../../services/productService';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { Row, Col } from 'react-bootstrap';
import { getAllClients } from './../../../../services/themeServices';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { toast } from 'react-toastify';

const { Option } = Select;

let timeout;

const CreateTabMenu = ({ showCreateForm }) => {

    const { tabMenues, setTabMenues } = useContext(adminContext);

    const types = [
        { title: "Timeline", key: 1 },
        { title: "Progress Bar", key: 2 },
        { title: "Products", key: 3 },
        { title: "Post", key: 4 },
        { title: "Client", key: 5 }
    ]

    const [client, setClient] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [tabContent, setTabContent] = useState({ title: "", type: 1, leftContent: 0, rightContent: 0 })
    const [contentType, setContentType] = useState(types[0]);

    const handleChangeType = (value) => {
        setContentType(types[value - 1]);
        setTabContent({ ...tabContent, type: value, content_leftt: 0, content_Right: 0 });
        form.setFieldsValue({ content_leftt: 0, content_Right: 0 });
    }

    const handleResetTab = () => {
        setShowAddForm(false);
        setClient([]);
        setTabContent({ title: "", type: 1, leftContent: 0, rightContent: 0 });
        form.setFieldsValue({ tab_title: "", type: 1, content_leftt: 0, content_Right: 0 });
    }

    const handleNewTab = async () => {
        const newTabs = [...tabs];
        const value = {
            title: tabContent.title,
            type: tabContent.type,
            content: contentType.key === 5 ? [...client.map(c => c.value.toString())] : [tabContent.leftContent, tabContent.rightContent],
            date: Date.now()
        }
        try {
            const { data, status } = await createTab(value);
            if(status === 201) {
                newTabs.push(data);
                setTabs(newTabs);
                handleResetTab();
            } else {
                toast.error("Failed to add tab");
            }
        } catch (err) {
            toast.error("Failed to add tab");
        }
    }

    const handleDeleteTab = async (index) => {
        const newTabs = [...tabs];
        const deletedTab = newTabs[index];
        try {
            const { status } = await deleteTab(deletedTab.id);

            if (status === 200) {
                newTabs.splice(index, 1);
                setTabs(newTabs);
                toast.success("Tab was deleted.");
            } else {
                toast.error("Failed to delete Tab.");
            }

        } catch (err) {
            toast.error("Failed to delete Tab.");
        }
    }

    const getData = () => {
        switch (contentType.key) {
            case 1: return getAllTimelines()
            case 2: return getAllProgressBarLists()
            case 3: return getAllProducts()
            case 4: return getAllPosts()
            default: return []
        }
    };

    const fetchData = (value, callback) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const fetch = async () => {
            try {
                const { data } = await getData();
                if (data) {
                    const filteredData = data.filter(content => {
                        return content.title.toLowerCase().includes(value.toLowerCase());
                    });

                    const newData = filteredData.map(content => ({
                        text: content.title,
                        value: content.id,
                    }))

                    callback(newData);
                }

            } catch (err) {
                toast.error("There was an error receiving data.");
            }
        }
        timeout = setTimeout(fetch, 300);

    }

    const fetchClients = async (clientTitle) => {

        let clients = [];

        try {
            const { data, status } = await getAllClients()
            if (status === 200) {
                clients = data.filter(client => {
                    return client.title.toLowerCase().includes(clientTitle.toLowerCase());
                });
            }

        } catch (err) {
            toast.error("There was an error receiving clients.")
        }

        return clients.map(client => ({
            label: client.title,
            value: client.id,
        }));
    }

    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Create Tab Menu" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ type: types[0] }}
                onFinish={async (value) => {

                    const { title } = value;

                    const saveMenu = async () => {
                        try {
                            const { data, status } = await createTabMenu({ title, tabs: tabs.map(tab => tab.id), date: Date.now() });

                            if (status === 201) {
                                const newTabMenus = [...tabMenues, data];
                                setTabMenues(newTabMenus);
                                toast.success("Record added successfully.");
                            } else {
                                toast.error("An error occurred creating the record.");
                            }
                            showCreateForm(false);
                        } catch (err) {
                            toast.error("An error occurred creating the record.");
                        }
                        setTabs([]);
                    }

                    await saveMenu();

                }}
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
                                    rules={[{ required: true, message: 'Title is required!' }]}
                                >
                                    <Input onChange={e => setTabContent({ ...tabContent, title: e.target.value })} />
                                </Form.Item>
                            </Col>
                            <Col sm={6}>
                                <Form.Item name="type" label="Select a Content Type" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Select a Content Type"
                                        onChange={(value) => handleChangeType(value)}
                                        allowClear
                                        onSelect={value => setTabContent({ ...tabContent, type: value })}
                                    >
                                        {
                                            types.map((item, index) => <Option key={index} value={item.key}>{item.title}</Option>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>


                            {
                                contentType.key === 5 ? (
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
                                                fetchOptions={fetchClients}
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
                                                    fetchData={fetchData}
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
                                                    fetchData={fetchData}
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

                <Form.Item>
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Tab Menu</Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default CreateTabMenu;