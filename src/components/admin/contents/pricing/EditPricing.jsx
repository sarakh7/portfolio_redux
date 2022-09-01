import { Form, Input, Button, Switch } from 'antd';
import SearchInput from '../../../../utils/SearchInput';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAppServices } from '../../../../hooks/useAppServices';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../../hooks/sliceHooks';
import { editItem } from '../../../../store/entities/admin/adminActions';


const EditPricing = () => {

    const [tabMenu, setTabMenu] = useState([]);

    const services = useAppServices();

    const dispatch = useDispatch();
    const actions = useSliceActions();
    const { currentItem } = useSliceSelector();
    const service = useSliceService();

    const [form] = Form.useForm();

    useEffect(() => {
        setTabMenu(currentItem.tab_menu);
    }, [currentItem]);

    return (
        <Form
            form={form}
            name="add-event"
            layout="vertical"
            initialValues={{ title: currentItem.title, status: currentItem.status }}
            onFinish={value => dispatch(editItem(actions, {
                id: currentItem.id,
                ...value,
                tab_menu: tabMenu
            }, service.updateItem))}
        
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
                            service={services.tabMenues}
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
                <Button onClick={() => dispatch(actions.editFormCanceled())}>Cancel</Button>
                {" "}
                <Button type="primary" htmlType="submit">Save Changes</Button>
            </Form.Item>

        </Form>
    );
}

export default EditPricing;