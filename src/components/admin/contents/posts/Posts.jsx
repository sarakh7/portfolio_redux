import { useEffect, useState, useContext } from 'react';
import { deletePost, getAllPosts } from "../../../../services/postService";
import { PlusOutlined } from '@ant-design/icons';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import { adminContext } from '../../../../context/adminContext';
import ContentTable from '../content-table/ContentTable';
import ContentHeader from '../content-header/ContentHeader';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../../store/admin/post/postsActions';
import { removePost } from './../../../../store/admin/post/postsActions';
import { addPostCanceled, showAddPostForm } from '../../../../store/admin/post/postsSlice';


const Posts = () => {

    const [currentPostData, setCurrentPostData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    // const [showCreateForm, setShowCreateForm] = useState(false);

    const { posts, showCreateForm } = useSelector(state => state.posts);

    const dispatch = useDispatch();

    const handleDeleteRecord = async (postId) => {
        dispatch(removePost(postId));
    }

    const handleEditRecord = (post) => {
        setCurrentPostData(post);
        setShowEditForm(true);
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <>
            {
                showEditForm ? <EditPost currentPostData={currentPostData} showEditForm={setShowEditForm} />
                    : showCreateForm
                        ? <CreatePost />
                        : <>
                            <ContentHeader title="Posts" icon={<PlusOutlined />} btnTitle="Add New Post" action={showAddPostForm} />
                            <ContentTable data={posts} dataTitle="Posts" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                        </>
            }

        </>
    );
}

export default Posts;