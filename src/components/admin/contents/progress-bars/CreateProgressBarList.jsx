import { useState, useContext } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { createProgressBarList, getAllProgressBars } from '../../../../services/progressBarService';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateProgressBarList = ({ showCreateForm }) => {

    const [value, setValue] = useState([]);

    const { progressBarLists, setProgressBarLists } = useContext(adminContext);

    const fetchData = async (progressBarTitle) => {

        let progressBars = [];
        try {
            const { data, status } = await getAllProgressBars()
            if (status === 200) {
                progressBars = data.filter(progressBar => {
                    return progressBar.title.toLowerCase().includes(progressBarTitle.toLowerCase());
                });
            }

        } catch (err) {
            toast.error("There was an error receiving data.");
        }

        return progressBars.map(progressBar => ({
            label: progressBar.title,
            value: progressBar.id,
        }));
    }


    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Create Progress bar List" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showCreateForm} />

            <Form
                form={form}
                name="add-event"
                layout="vertical"
                initialValues={{ status: true }}
                onFinish={async (value) => {
                    try {
                        const { data, status } = await createProgressBarList({ ...value, progressbars: value.progressbars?.map(progressbar => progressbar.value) });
                        if (status === 201) {
                            const newProgressBarList = [...progressBarLists, data];
                            setProgressBarLists(newProgressBarList);
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
                            label="Subtitle"
                            name="subtitle"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Select ProgressBar"
                    name="progressbars"
                >
                    <DebounceSelect
                        mode="multiple"
                        allowClear
                        value={value}
                        placeholder="Select users"
                        fetchOptions={fetchData}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}

                    />

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
                    <Button type="primary" htmlType="submit">Create ProgressBar List</Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default CreateProgressBarList;