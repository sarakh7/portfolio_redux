
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { getAllGroups, deleteGroup } from './../../../../../services/postService';
import ContentHeader from '../../content-header/ContentHeader';
import ContentTable from '../../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import CreateCat from './CreateCat';
import { adminContext } from '../../../../../context/adminContext';
import EditCat from './EditCat';
import { toast } from 'react-toastify';

const PostCats = () => {

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { cats, setCats } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllGroups();
            if (status === 200) {
                setCats(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }
    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteGroup(recordId);
            if(status === 200) {
                const newContents = cats.filter(cat => cat.id !== recordId);
                setCats(newContents);
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
    }, []);

    return (
        <>
            {
                showEditForm ? <EditCat currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateCat showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Categories" icon={<PlusOutlined />} btnTitle="Add New Category" action={setShowCreateForm} />
                                    <ContentTable data={cats} dataTitle="Categories" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />

                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default PostCats;