import { useState, useContext } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { updateProgressBarList, getAllProgressBars } from '../../../../services/progressBarService';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditProgressBarList = ({ currentData, showEditForm }) => {

    const [value, setValue] = useState([]);
    const [currentProgressBars, setCurrentProgressBars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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


    const getProgressBars = async () => {
        try {
            const { data, status } = await getAllProgressBars()
            if (status === 200) {
                const filteredProgressBars = data.filter(progressBar => currentData.progressbars?.includes(progressBar.id));
                const newProgressBars = filteredProgressBars.map(progressBar => ({
                    label: progressBar.title,
                    value: progressBar.id,
                }));
                setCurrentProgressBars(newProgressBars);
                setIsLoading(false);
            } 

        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }
    useEffect(() => {
        getProgressBars();
    }, []);


    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader title="Edit Progress bar" icon={<ArrowLeftOutlined />} btnTitle="Back" action={showEditForm} />

            {isLoading ? <div>Loading ...</div>
                : (
                    <Form
                        form={form}
                        name="add-event"
                        layout="vertical"
                        initialValues={{ ...currentData, progressbars: currentProgressBars }}
                        onFinish={async (value) => {
                            const newValues = { ...value, progressbars: value.progressbars.map(preogressbar => preogressbar.value) };

                            try {

                                const { data, status } = await updateProgressBarList(currentData.id, newValues);
                                if (status === 200) {
                                    const newData = [...progressBarLists];
                                    const dataIndex = newData.findIndex(data => data.id === currentData.id);
                                    newData[dataIndex] = data;
                                    setProgressBarLists([...newData]);
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
                            <Button onClick={() => showEditForm(false)}>Cancel</Button>
                            {" "}
                            <Button type="primary" htmlType="submit">Save Changes</Button>
                        </Form.Item>
                    </Form>
                )
            }
        </>

    );
}

export default EditProgressBarList;