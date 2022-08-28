
import { useEffect } from 'react';
import { getAllGroups, deleteGroup } from './../../../../../services/postService';
import ContentHeader from '../../content-header/ContentHeader';
import ContentTable from '../../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import CreateCat from './CreateCat';
import EditCat from './EditCat';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../../context/SliceProvider';
import { removeItem, getItems } from '../../../../../store/entities/adminActions';

const PostCats = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = async (recordId) => {
        dispatch(removeItem({
            actions,
            itemId: recordId,
            removeFunc: deleteGroup
        }))
    }

    const handleEditRecord = (recored) => {
        dispatch(actions.itemSelected(recored));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems({
            actions,
            getItemFunc: getAllGroups
        }))
    }, [dispatch, actions]);

    return (
        <> {
            showEditForm ? <EditCat />
                : showCreateForm ? <CreateCat />
                    : <>
                        <ContentHeader
                            title="Categories"
                            icon={<PlusOutlined />}
                            btnTitle="Add New Category"
                            action={actions.createFormOpened}
                        />
                        <ContentTable
                            data={items}
                            dataTitle="Categories"
                            handleEditRecord={handleEditRecord}
                            handleDeleteRecord={handleDeleteRecord}
                        />
                    </>
        }
        </>
    )
}

export default PostCats;