import { useEffect, useState, useContext } from 'react';
import { deletePost, getAllPosts } from "../../../../services/postService";
import { PlusOutlined } from '@ant-design/icons';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import { adminContext } from '../../../../context/adminContext';
import ContentTable from '../content-table/ContentTable';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';


const Posts = () => {

    const [currentPostData, setCurrentPostData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { posts, setPosts } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllPosts();
            if (status === 200) {
                setPosts(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (post_Id) => {
        try {
            const { status } = await deletePost(post_Id);
            if(status === 200) {
                const newContents = posts.filter(post => post.id !== post_Id);
                setPosts(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }
        } catch (err) {
            toast.error("Failed to delete record.");
        }
    }

    const handleEditRecord = (post) => {
        setCurrentPostData(post);
        setShowEditForm(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {
                showEditForm ? <EditPost currentPostData={currentPostData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreatePost showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Posts" icon={<PlusOutlined />} btnTitle="Add New Post" action={setShowCreateForm} />
                                    <ContentTable data={posts} dataTitle="Posts" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }

        </>
    );
}

export default Posts;