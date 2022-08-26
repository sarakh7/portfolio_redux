import { deleteTabMenu, getAllTabMenues } from "../../../../services/tabMenuService";
import { useEffect, useState, useContext } from 'react';
import { adminContext } from "../../../../context/adminContext";
import ContentHeader from "../content-header/ContentHeader";
import NoneEditableTable from './../content-table/NoneEditableTable';
import { PlusOutlined } from '@ant-design/icons';
import CreateTabMenu from './CreateTabMenu';
import { toast } from 'react-toastify';

const TabMenues = () => {

    const [showCreateForm, setShowCreateForm] = useState(false);

    const { tabMenues, setTabMenues } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllTabMenues()
            if (status === 200) {
                setTabMenues(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteTabMenu(recordId);
            if (status === 200) {
                const newContents = tabMenues.filter(tabMenu => tabMenu.id !== recordId);
                setTabMenues(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }

        } catch (err) {
            toast.error("Failed to delete record.");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>

            {
                showCreateForm ? (<CreateTabMenu showCreateForm={setShowCreateForm} />) : (
                    <>
                        <ContentHeader title="Tab Menues" icon={<PlusOutlined />} btnTitle="Add New Tab Menu" action={setShowCreateForm} />
                        <NoneEditableTable data={tabMenues} dataTitle="Tab Menues" handleDeleteRecord={handleDeleteRecord} />
                    </>
                )
            }

        </>
    );
}

export default TabMenues;