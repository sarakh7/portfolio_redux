import { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import ContentTable from '../content-table/ContentTable';
import ContentHeader from '../content-header/ContentHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../../store/entities/admin/post/postsActions';
import { removePost } from './../../../../store/entities/admin/post/postsActions';
import {
    addPostCanceled,
    editPostCanceled,
    postSeledted,
    showAddPostForm,
    showEditPostForm
} from '../../../../store/entities/admin/post/postsSlice';


const Posts = () => {

    const { posts, showCreateForm, showEditForm } = useSelector(state => state.entities.admin.posts);
    const dispatch = useDispatch();

    const handleDeleteRecord = async (postId) => {
        dispatch(removePost(postId));
    }

    const handleEditRecord = (post) => {
        dispatch(postSeledted(post));
        dispatch(showEditPostForm());
    }

    useEffect(() => {
        dispatch(editPostCanceled());
        dispatch(addPostCanceled());
        dispatch(getPosts());

    }, [dispatch]);

    return (
        <>
            {
                showEditForm ? <EditPost />
                    : showCreateForm
                        ? <CreatePost />
                        : <>
                            <ContentHeader
                                title="Posts"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Post"
                                action={showAddPostForm}
                            />
                            <ContentTable
                                data={posts}
                                dataTitle="Posts"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>
            }

        </>
    );
}

export default Posts;