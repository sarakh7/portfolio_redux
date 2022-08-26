import { Form, Input, Button, Switch } from 'antd';
import SearchInput from '../../../../utils/SearchInput';
import { useState, useContext } from 'react';
import { getAllTabMenues } from '../../../../services/tabMenuService';
import { createPricing } from '../../../../services/themeServices';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

let timeout;

const CreatePricing = ({ showCreateForm }) => {

    const [tabMenu, setTabMenu] = useState([]);

    const { pricings, setPricings } = useContext(adminContext);

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

    return (

        <>
            <ContentHeader title="Create Pricings Section" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createPricing({ ...value, tab_menu: tabMenu });
                        if (status === 201) {
                            setPricings([...pricings, data]);
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
                    <Button onClick={() => showCreateForm(false)}>Cancel</Button>
                    {" "}
                    <Button type="primary" htmlType="submit">Create Resume</Button>
                </Form.Item>

            </Form>
        </>

    );
}

export default CreatePricing;