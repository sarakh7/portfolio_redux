
import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { deleteClientsSection, getAllClientsSection } from '../../../../services/themeServices';
import ContentTable from '../content-table/ContentTable';
import CreateClientsSection from './CreateClientsSection';
import { PlusOutlined } from '@ant-design/icons';
import EditClientsSection from './EditClientsSection';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';

const ClientsSections = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { clientsSections, setClientsSections } = useContext(adminContext)

    const fetchData = async () => {
        try {
            const { data, status } = await getAllClientsSection()
            if (status === 200) {
                setClientsSections(data);
            } else {
                toast.error("There was an error receiving data.");
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteClientsSection(recordId);
            if (status === 200) {
                const newContents = clientsSections.filter(cs => cs.id !== recordId);
                setClientsSections(newContents);
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
                showEditForm ? <EditClientsSection currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateClientsSection showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Client Sections" icon={<PlusOutlined />} btnTitle="Add New Client Section" action={setShowCreateForm} />
                                    <ContentTable data={clientsSections} dataTitle="Client Sections" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default ClientsSections;