import { Table, Space, Modal, Button } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const NoneEditableTable = ({ data, handleDeleteRecord }) => {


    const showDeleteConfirm = (post) => {
        confirm({
            title: 'Are you sure delete this Item?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                handleDeleteRecord(post.id)
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" danger icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm(record)}
                    >Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <Table

            rowKey={record => record.id}
            columns={columns}
            dataSource={[...data].reverse()}
            pagination={
                {
                    pageSize: 5,
                }
            }
        />
    );
}

export default NoneEditableTable;