import { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ContentHeader from '../contents/content-header/ContentHeader';
import ContentTable from '../contents/content-table/ContentTable';
import { useSliceActions, useSliceSelector, useSliceService } from '../../../hooks/sliceHooks';
import { getItems, removeItem } from '../../../store/entities/adminActions';
import FormLayout from './FormLayout';

const ContentLayout = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const service = useSliceService();
    const actions = useSliceActions();

    const handleDeleteRecord = (recordId) => {
        dispatch(removeItem(actions, recordId, service.deleteItem));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, service.getAllItems))

    }, [dispatch, actions]);

    return (
        <>
            {
                showEditForm ? <FormLayout typeName="Edit">{service.editForm}</FormLayout>
                    : showCreateForm ? <FormLayout typeName="Create">{service.createForm}</FormLayout>
                        :
                        <>
                            <ContentHeader
                                title={`${service.name} List`}
                                icon={<PlusOutlined />}
                                btnTitle={`Add New ${service.name}`}
                                action={actions.createFormOpened}
                            />
                            <ContentTable
                                data={items}
                                dataTitle="Product"
                                handleEditRecord={handleEditRecord}
                                handleDeleteRecord={handleDeleteRecord}
                            />
                        </>
            }
        </>
    );
}

export default ContentLayout;