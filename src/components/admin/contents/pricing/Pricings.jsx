
import { useEffect, useState, useContext } from 'react';
import { deletePricing, getAllPricings } from '../../../../services/themeServices';
import ContentTable from '../content-table/ContentTable';
import CreatePricing from './CreatePricing';
import { adminContext } from '../../../../context/adminContext';
import { PlusOutlined } from '@ant-design/icons';
import EditPricing from './EditPricing';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';

const Pricings = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { pricings, setPricings } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllPricings()
            if (status === 200) {
                setPricings(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deletePricing(recordId);
            if (status === 200) {
                const newContents = pricings.filter(pricing => pricing.id !== recordId);
                setPricings(newContents);
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
                showEditForm ? <EditPricing currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreatePricing showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Pricings" icon={<PlusOutlined />} btnTitle="Add New Pricing" action={setShowCreateForm} />
                                    <ContentTable data={pricings} dataTitle="Pricings" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default Pricings;