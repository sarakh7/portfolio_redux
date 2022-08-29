
import { useEffect } from 'react';
import { deleteProgressBarList, getAllProgressBarLists } from '../../../../services/progressBarService';
import EditProgressBarList from './EditProgressBarList';
import CreateProgressBarList from './CreateProgressBarList';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../hooks/sliceHooks';
import { getItems, removeItem } from '../../../../store/entities/adminActions';

const ProgressBarLists = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = (recordId) => {
        dispatch(removeItem(actions, recordId, deleteProgressBarList));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, getAllProgressBarLists))

    }, [dispatch, actions]);

    return (
        <>
            {
                showEditForm ? <EditProgressBarList />
                    : showCreateForm ? <CreateProgressBarList />
                        : <>
                            <ContentHeader
                                title="Progress bar List"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Progress bar List"
                                action={actions.createFormOpened}
                            />
                            <ContentTable
                                data={items}
                                dataTitle="Progress bar List"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>
            }

        </>
    );
}

export default ProgressBarLists;