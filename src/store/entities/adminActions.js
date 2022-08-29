import { toast } from 'react-toastify';

export const addItem = (actions, item, createItemFunc) => async (dispatch) => {

    try {
        const { data, status } = await createItemFunc(item);

        if (status === 201) {
            dispatch(actions.itemAdded(data));
            toast.success("Record added successfully.");
        } else {
            toast.error("An error occurred creating the record.");
        }

    } catch (err) {
        toast.error("An error occurred creating the record.");
        console.log(err)
    }
}

export const getItems = (actions, getItemFunc) => async (dispatch) => {
    try {
        const { data, status } = await getItemFunc();
        if (status === 200) {
            dispatch(actions.itemReceived(data));
        }
    } catch (err) {
        toast.error("There was an error receiving data.");
    }
}

export const removeItem = (actions, itemId, removeFunc) => async (dispatch) => {
    try {
        const { status } = await removeFunc(itemId);
        if (status === 200) {
            dispatch(actions.itemRemoved(itemId));
            toast.success("The record was deleted.");
        } else {
            toast.error("Failed to delete record.");
        }
    } catch (err) {
        toast.error("Failed to delete record.");
    }
}

export const editItem = (actions, item, updateFunc) => async (dispatch) => {

    try {
        const { data, status } = await updateFunc(item.id, item);

        if (status === 200) {
            dispatch(actions.itemUpdated(data));
            toast.success("The record was successfully edited.");

        } else {
            toast.error("Editing failed.");
        }

    } catch (err) {
        toast.error("Editing failed.");
    }
}

export const getInnerItems = (actions, innerList, getItemsFunc) => async (dispatch) => {
    try {
        const { data, status } = await getItemsFunc()
        if (status === 200) {
            const innerItems = data.filter(item => innerList?.includes(item.id))
                .map(item => ({
                    label: item.title,
                    value: item.id,
                }));
            dispatch(actions.innerItemsReceived(innerItems));
        }

    } catch (err) {
        toast.error("There was an error receiving events.");
    }
}