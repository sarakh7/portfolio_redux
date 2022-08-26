
import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { deleteClient, getAllClients } from '../../../../services/themeServices';
import ContentTable from '../content-table/ContentTable';
import CreateClient from './CreateClient';
import { PlusOutlined } from '@ant-design/icons';
import EditClient from './EditClient';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';

const Clients = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { clients, setClients } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllClients()
            if (status === 200) {
                setClients(data);
            } else {
                toast.error("There was an error receiving data.");
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { data, status } = await deleteClient(recordId);
            if (status === 200) {
                const newContents = clients.filter(client => client.id !== recordId);
                setClients(newContents);
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
                showEditForm ? <EditClient currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateClient showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Clients" icon={<PlusOutlined />} btnTitle="Add New CLient" action={setShowCreateForm} />
                                    <ContentTable data={clients} dataTitle="Clients" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default Clients;