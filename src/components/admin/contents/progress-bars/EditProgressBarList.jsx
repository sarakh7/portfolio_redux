import { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { updateProgressBarList, getAllProgressBars } from '../../../../services/progressBarService';
import DebounceSelect from '../../../../utils/DebounceSelect';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../hooks/sliceHooks';
import { editItem, getInnerItems } from '../../../../store/entities/adminActions';

const EditProgressBarList = ({ currentData, showEditForm }) => {

    const [value, setValue] = useState([]);

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem, innerItems, loadingInnerItems } = useSliceSelector();

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

    useEffect(() => {
        dispatch(getInnerItems(actions, currentItem.progressbars, getAllProgressBars));

    }, [dispatch, actions, currentItem]);


    const [form] = Form.useForm();

    return (

        <>
            <ContentHeader
                title="Edit Progress bar"
                icon={<ArrowLeftOutlined />}
                btnTitle="Back"
                action={actions.editFormCanceled}
            />

            {loadingInnerItems ? <div>Loading ...</div>
                : (
                    <Form
                        form={form}
                        name="add-event"
                        layout="vertical"
                        initialValues={{ ...currentItem, progressbars: innerItems }}
                        onFinish={value => dispatch(editItem(actions, {
                            id: currentItem.id,
                            ...value,
                            progressbars: value.progressbars.map(preogressbar => preogressbar.value)
                        }, updateProgressBarList))
                        }
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
                            <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
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