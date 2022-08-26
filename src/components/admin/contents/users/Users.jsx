
import { useEffect, useState, useContext } from 'react';
import ContentTable from '../content-table/ContentTable';
import { adminContext } from '../../../../context/adminContext';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { deleteUser, getAllUsers } from '../../../../services/authService';
import EditUser from './EditUser';
import { toast } from 'react-toastify';

const Users = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { users, setUsers } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllUsers()
            if (status === 200) {
                setUsers(data.filter(d => d.id !== 1));
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteUser(recordId);
            if (status === 200) {
                const newContents = users.filter(d => d.id !== recordId);
                setUsers(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }

        } catch (err) {
            toast.error("Failed to delete record.");
        }
    }

    const handleEditRecord = (record) => {
        setCurrentData(record);
        setShowEditForm(true);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            {
                showEditForm ? <EditUser currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        <ContentHeader title="Users" icon={<PlusOutlined />} />
                        <ContentTable data={users} dataTitle="Users" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />

                    </>

                )
            }

        </>
    );
}

export default Users;