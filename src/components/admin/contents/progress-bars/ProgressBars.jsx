
import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { deleteProgressBar, getAllProgressBars } from '../../../../services/progressBarService';
import EditProgressBar from './EditProgressBar';
import CreateProgressBar from './CreateProgressBar';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const ProgressBars = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { progressBars, setProgressBars } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllProgressBars()
            if (status === 200) {
                setProgressBars(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteProgressBar(recordId);
            if (status === 200) {
                const newContents = progressBars.filter(progressBar => progressBar.id !== recordId);
                setProgressBars(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }

        } catch (err) {
            toast.error("Failed to delete record.");
        }
    }

    const handleEditRecord = (event) => {
        setCurrentData(event);
        setShowEditForm(true);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            {
                showEditForm ? <EditProgressBar currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateProgressBar showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Progress bars" icon={<PlusOutlined />} btnTitle="Add New Progress bar" action={setShowCreateForm} />
                                    <ContentTable data={progressBars} dataTitle="Progress bars" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default ProgressBars;