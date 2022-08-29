
import { useEffect } from 'react';
import { deleteTimeline, getAllTimelines } from '../../../../services/eventServices';
import { PlusOutlined } from '@ant-design/icons';
import CreateTimeline from './CreateTimeline';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import EditTimeline from './EditTimeline';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../context/SliceProvider';
import { getItems, removeItem } from '../../../../store/entities/adminActions';

const Timelines = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = (recordId) => {
        dispatch(removeItem(actions, recordId, deleteTimeline));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, getAllTimelines))

    }, [dispatch, actions]);

    return (

        <>
            {
                showEditForm ?
                    <EditTimeline />
                    : showCreateForm
                        ? <CreateTimeline />
                        : <>
                            <ContentHeader
                                title="Timelines"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Timeline"
                                action={actions.createFormOpened}
                            />
                            <ContentTable
                                data={items}
                                dataTitle="Timelines"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>
            }

        </>

    );
}

export default Timelines;