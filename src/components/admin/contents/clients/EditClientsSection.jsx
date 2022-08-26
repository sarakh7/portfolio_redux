import { Form, Divider, Input, Button, Switch } from 'antd';
import SearchInput from '../../../../utils/SearchInput';
import { useState, useContext, useEffect } from 'react';
import { getAllTabMenues } from '../../../../services/tabMenuService';
import { updateClientsSection } from '../../../../services/themeServices';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

let timeout;

const EditClientsSection = ({ currentData, showEditForm }) => {

    const [tabMenu, setTabMenu] = useState([]);

    const { clientsSections, setClientsSections } = useContext(adminContext)

    const [form] = Form.useForm();

    const fetchData = (value, callback) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const fetch = async () => {
            try {
                const { data } = await getAllTabMenues();
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


    useEffect(() => {
        setTabMenu(currentData.tab_menu);
    }, []);

    return (

        <>
            <ContentHeader title="Edit Client Section" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            <Form
                form={form}
                name="add-client-section"
                layout="vertical"
                initialValues={{ title: currentData.title, status: currentData.status }}
                onFinish={async (value) => {
                    const newValues = { ...value, tab_menu: tabMenu };
                    try {
                        const { data, status } = await updateClientsSection(currentData.id, newValues);
                        if (status === 200) {
                            const newData = [...clientsSections];
                            const dataIndex = newData.findIndex(data => data.id === currentData.id);
                            newData[dataIndex] = data;
                            setClientsSections([...newData]);
                            toast.success("The record was successfully edited.");
                        } else {
                            toast.error("Editing failed.");
                        }

                        showEditForm(false);

                    } catch (err) {
                        toast.error("Editing failed.");
                    }
                }}
                onFinishFailed={err => toast.error("Please complete all fields correctly.")}
                autoComplete="off"
            >

                <Row>
                    <Col sm={6}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={6}>
                        <Form.Item
                            label={`Select a Tab Menu`}
                            name="tab_menu"
                        >
                            <SearchInput
                                placeholder="search a title"
                                fetchData={fetchData}
                                onSelect={value => setTabMenu(value)}
                            />
                        </Form.Item>

                    </Col>
                </Row>

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

export default EditClientsSection;