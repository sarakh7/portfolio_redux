
import { useEffect } from 'react';
import { deleteProgressBar, getAllProgressBars } from '../../../../services/progressBarService';
import EditProgressBar from './EditProgressBar';
import CreateProgressBar from './CreateProgressBar';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../context/SliceProvider';
import { getItems, removeItem } from '../../../../store/entities/adminActions';

const ProgressBars = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = async (recordId) => {
        dispatch(removeItem(actions, recordId, deleteProgressBar));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, getAllProgressBars))

    }, [dispatch, actions]);


    return (
        <>
            {
                showEditForm ? <EditProgressBar />
                    : showCreateForm ? <CreateProgressBar />
                        : <>
                            <ContentHeader
                                title="Progress bars"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Progress bar"
                                action={actions.createFormOpened}
                            />
                            <ContentTable
                                data={items}
                                dataTitle="Progress bars"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>
            }
        </>
    );
}

export default ProgressBars;