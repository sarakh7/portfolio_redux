
import { useEffect, useState, useContext } from 'react';
import { deleteSocial, getAllSocial } from '../../../../services/socialService';
import CreateSocial from './CreateSocial';
import ContentTable from '../content-table/ContentTable';
import { adminContext } from '../../../../context/adminContext';
import EditSocial from './EditSocial';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';

const Socials = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { socials, setSocials } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllSocial()
            if (status === 200) {
                setSocials(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { data, status } = await deleteSocial(recordId);
            if (status === 200) {
                const newContents = socials.filter(social => social.id !== recordId);
                setSocials(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }

        } catch (err) {
            toast.error("Failed to delete record.")
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
                showEditForm ? <EditSocial currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateSocial showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Social Mediaes" icon={<PlusOutlined />} btnTitle="Add New Social Media" action={setShowCreateForm} />
                                    <ContentTable data={socials} dataTitle="Social Mediaes" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default Socials;