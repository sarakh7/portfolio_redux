
import { deleteEvent, getAllEvents } from '../../../../services/eventServices';
import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import EditEvent from './EditEvent';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import CreateEvent from './CreateEvent';
import { toast } from 'react-toastify';

const Events = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { events, setEvents } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllEvents()
            if (status === 200) {
                setEvents(data);
            } else {
                toast.error("There was an error receiving data.");
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteEvent(recordId);
            if(status === 200) {
                const newContents = events.filter(event => event.id !== recordId);
                setEvents(newContents);
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
                showEditForm ? <EditEvent currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateEvent showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Events" icon={<PlusOutlined />} btnTitle="Add New Event" action={setShowCreateForm} />
                                    <ContentTable data={events} dataTitle="Events" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default Events;