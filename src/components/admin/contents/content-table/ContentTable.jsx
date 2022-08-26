import { Table, Modal, Button, Divider, Tag } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './content-table.module.css'

const { confirm } = Modal;

const ContentTable = ({ data, handleEditRecord, handleDeleteRecord, noStatus }) => {

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

            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            responsive: ['lg'],
            render: status => <span>{status ? <Tag color="#5FAD56">Active</Tag> : <Tag color="#F2C14E">Inactive</Tag>}</span>

        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div className={styles.actions}>
                    <>
                        <Button type="text" icon={<EditOutlined />}
                            onClick={() => handleEditRecord(record)}
                        > <span className={styles.btnText}>Edit</span> </Button>
                        <Divider className={styles.verticalLine} type='vertical' />
                        <Divider className={styles.horizontalLine} />
                        <Button type="text" danger icon={<DeleteOutlined />}
                            onClick={() => showDeleteConfirm(record)}
                        ><span className={styles.btnText}>Delete</span> </Button>
                    </>

                </div>
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

export default ContentTable;