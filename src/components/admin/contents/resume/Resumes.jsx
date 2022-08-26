import { useEffect, useState, useContext } from 'react';
import { deleteResume, getAllResumes } from "../../../../services/themeServices";
import CreateResume from './CreateResume';
import { adminContext } from '../../../../context/adminContext';
import ContentHeader from '../content-header/ContentHeader';
import { PlusOutlined } from '@ant-design/icons';
import EditResume from './EditResume';
import ContentTable from '../content-table/ContentTable';
import { toast } from 'react-toastify';

const Resumes = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { resumes, setResumes } = useContext(adminContext)

    const fetchData = async () => {
        try {
            const { data, status } = await getAllResumes()
            if (status === 200) {
                setResumes(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteResume(recordId);
            if (status === 200) {
                const newContents = resumes.filter(resume => resume.id !== recordId);
                setResumes(newContents);
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
                showEditForm ? <EditResume currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateResume showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Resumes" icon={<PlusOutlined />} btnTitle="Add New Resume" action={setShowCreateForm} />
                                    <ContentTable data={resumes} dataTitle="Resumes" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default Resumes;