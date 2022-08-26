
import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { adminContext } from '../../../../context/adminContext';
import { deleteAbout, getAllAbouts } from '../../../../services/themeServices';
import ContentTable from '../content-table/ContentTable';
import CreateAbout from './CreateAbout';
import { PlusOutlined } from '@ant-design/icons';
import EditAbout from './EditAbout';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';

const Abouts = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { abouts, setAbouts } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllAbouts()
            if (status === 200) {
                setAbouts(data);
            } else {
                toast.error("There was an error receiving data.");
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteAbout(recordId);
            if (status === 200) {
                const newContents = abouts.filter(about => about.id !== recordId);
                setAbouts(newContents);
                toast.success("The record was deleted.")
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
                showEditForm ? <EditAbout currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateAbout showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="About Sections" icon={<PlusOutlined />} btnTitle="Add New About Section" action={setShowCreateForm} />
                                    <ContentTable data={abouts} dataTitle="About Sections" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default Abouts;