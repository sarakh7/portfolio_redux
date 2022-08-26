
import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { deleteProgressBarList, getAllProgressBarLists } from '../../../../services/progressBarService';
import EditProgressBarList from './EditProgressBarList';
import CreateProgressBarList from './CreateProgressBarList';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const ProgressBarLists = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { progressBarLists, setProgressBarLists } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllProgressBarLists()
            if (status === 200) {
                setProgressBarLists(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteProgressBarList(recordId);
            if (status === 200) {
                const newContents = progressBarLists.filter(progressBar => progressBar.id !== recordId);
                setProgressBarLists(newContents);
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
                showEditForm ? <EditProgressBarList currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateProgressBarList showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Progress bar List" icon={<PlusOutlined />} btnTitle="Add New Progress bar List" action={setShowCreateForm} />
                                    <ContentTable data={progressBarLists} dataTitle="Progress bar List" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
            
        </>
    );
}

export default ProgressBarLists;