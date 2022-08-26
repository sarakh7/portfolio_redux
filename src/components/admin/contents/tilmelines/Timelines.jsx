
import { useState, useEffect, useContext } from 'react';
import { deleteTimeline, getAllTimelines } from '../../../../services/eventServices';
import { PlusOutlined } from '@ant-design/icons';
import { adminContext } from '../../../../context/adminContext';
import CreateTimeline from './CreateTimeline';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import EditTimeline from './EditTimeline';
import { toast } from 'react-toastify';

const Timelines = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { timelines, setTimelines } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllTimelines()
            if (status === 200) {
                setTimelines(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteTimeline(recordId);
            if (status === 200) {
                const newContents = timelines.filter(timeline => timeline.id !== recordId);
                setTimelines(newContents);
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
                showEditForm ? <EditTimeline currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateTimeline showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Timelines" icon={<PlusOutlined />} btnTitle="Add New Timeline" action={setShowCreateForm} />
                                    <ContentTable data={timelines} dataTitle="Timelines" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>

    );
}

export default Timelines;