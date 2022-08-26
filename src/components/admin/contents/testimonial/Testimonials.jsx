import { useEffect, useState, useContext } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { deleteTestimonial, getAllTestimonials } from '../../../../services/themeServices';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import CreateTestimonial from './CreateTestimonial';
import EditTestimonial from './EditTestimonial';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const Testimonials = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { testimonials, setTestimonials } = useContext(adminContext)

    const fetchData = async () => {
        try {
            const { data, status } = await getAllTestimonials()
            if (status === 200) {
                setTestimonials(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteTestimonial(recordId);
            if (status === 200) {
                const newContents = testimonials.filter(testi => testi.id !== recordId);
                setTestimonials(newContents);
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
                showEditForm ? <EditTestimonial currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateTestimonial showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Tetimonials" icon={<PlusOutlined />} btnTitle="Add New Tetimonial" action={setShowCreateForm} />
                                    <ContentTable data={testimonials} dataTitle="Tetimonials" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default Testimonials;