
import { deleteEvent, getAllEvents } from '../../../../services/eventServices';
import { useEffect } from 'react';
import EditEvent from './EditEvent';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import CreateEvent from './CreateEvent';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../hooks/sliceHooks';
import { getItems, removeItem } from '../../../../store/entities/adminActions';

const Events = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = (recordId) => {
        dispatch(removeItem(actions, recordId, deleteEvent));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, getAllEvents))

    }, [dispatch, actions]);


    return (
        <>
            {
                showEditForm
                    ? <EditEvent />
                    : showCreateForm
                        ? <CreateEvent />
                        : <>
                            <ContentHeader
                                title="Events"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Event"
                                action={actions.createFormOpened}
                            />
                            <ContentTable
                                data={items}
                                dataTitle="Events"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>

            }

        </>
    );
}

export default Events;