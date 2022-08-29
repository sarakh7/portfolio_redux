import { useEffect} from 'react';
import { deleteProduct, getAllProducts } from '../../../../services/productService';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { getItems, removeItem } from '../../../../store/entities/adminActions';
import { useDispatch } from 'react-redux';
import { useSliceActions, useSliceSelector } from '../../../../hooks/sliceHooks';

const Products = () => {

    const dispatch = useDispatch();
    const { items, showCreateForm, showEditForm } = useSliceSelector();
    const actions = useSliceActions();

    const handleDeleteRecord = (recordId) => {
        dispatch(removeItem(actions, recordId, deleteProduct));
    }

    const handleEditRecord = (record) => {
        dispatch(actions.itemSelected(record));
        dispatch(actions.editFormOpened());
    }

    useEffect(() => {
        dispatch(actions.createFormCanceled());
        dispatch(actions.editFormCanceled());
        dispatch(getItems(actions, getAllProducts))

    }, [dispatch, actions]);


    return (
        <>
            {
                showEditForm ? <EditProduct />
                    : showCreateForm ? <CreateProduct />
                        :
                        <>
                            <ContentHeader
                                title="Product"
                                icon={<PlusOutlined />}
                                btnTitle="Add New Product"
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

export default Products;