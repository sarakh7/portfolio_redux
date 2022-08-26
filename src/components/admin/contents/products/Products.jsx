import { useEffect, useState, useContext } from 'react';
import { deleteProduct, getAllProducts } from '../../../../services/productService';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import { adminContext } from '../../../../context/adminContext';
import { PlusOutlined } from '@ant-design/icons';
import ContentHeader from '../content-header/ContentHeader';
import ContentTable from '../content-table/ContentTable';
import { toast } from 'react-toastify';

const Products = () => {

    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    const { products, setProducts } = useContext(adminContext);

    const fetchData = async () => {
        try {
            const { data, status } = await getAllProducts()
            if (status === 200) {
                setProducts(data);
            }
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    }

    const handleDeleteRecord = async (recordId) => {
        try {
            const { status } = await deleteProduct(recordId);
            if(status === 200) {
                const newContents = products.filter(product => product.id !== recordId);
                setProducts(newContents);
                toast.success("The record was deleted.");
            } else {
                toast.error("Failed to delete record.");
            }     

        } catch (err) {
            toast.error("Failed to delete record.");
        }
    }

    const handleEditRecord = (event) => {
        setCurrentData(event);
        setShowEditForm(true);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            {
                showEditForm ? <EditProduct currentData={currentData} showEditForm={setShowEditForm} /> : (

                    <>
                        {
                            showCreateForm ? (<CreateProduct showCreateForm={setShowCreateForm} />) : (
                                <>
                                    <ContentHeader title="Product" icon={<PlusOutlined />} btnTitle="Add New Product" action={setShowCreateForm} />
                                    <ContentTable data={products} dataTitle="Product" handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    );
}

export default Products;