import { notificationSent } from '../../ui/uiSlice';

export const addItem = (actions, item, createItemFunc) => async (dispatch) => {

    try {
        const { data, status } = await createItemFunc(item);

        if (status === 201) {
            dispatch(actions.itemAdded(data));
            dispatch(notificationSent({type: "success", message: "Record added successfully."}));
        } else {
            dispatch(notificationSent({type: "error", message: "An error occurred creating the record."}));
        }

    } catch (err) {
        dispatch(notificationSent({type: "error", message: "An error occurred creating the record."}));
    }
}

export const getItems = (actions, getItemFunc) => async (dispatch) => {
    try {
        const { data, status } = await getItemFunc();
        if (status === 200) {
            dispatch(actions.itemReceived(data));
        }
    } catch (err) {
        dispatch(notificationSent({type: "error", message: "There was an error receiving data."}));
    }
}

export const removeItem = (actions, itemId, removeFunc) => async (dispatch) => {
    try {
        const { status } = await removeFunc(itemId);
        if (status === 200) {
            dispatch(actions.itemRemoved(itemId));
            dispatch(notificationSent({type: "success", message: "The record was deleted."}));
        } else {
            dispatch(notificationSent({type: "error", message: "Failed to delete record."}));
        }
    } catch (err) {
        dispatch(notificationSent({type: "error", message: "Failed to delete record."}));
    }
}

export const editItem = (actions, item, updateFunc) => async (dispatch) => {

    try {
        const { data, status } = await updateFunc(item.id, item);

        if (status === 200) {
            dispatch(actions.itemUpdated(data));
            dispatch(notificationSent({type: "success", message: "The record was successfully edited."}));

        } else {
            dispatch(notificationSent({type: "error", message: "Editing failed."}));
        }

    } catch (err) {
        dispatch(notificationSent({type: "error", message: "Editing failed."}));
    }
}

export const getInnerItems = (actions, innerList, getItemsFunc) => async (dispatch) => {
    try {
        const { data, status } = await getItemsFunc()
        if (status === 200) {
            const innerItems = data.filter(item => innerList?.includes(item.id))

            dispatch(actions.innerItemsReceived(innerItems));
        }

    } catch (err) {
        dispatch(notificationSent({type: "error", message: "There was an error receiving data"}));
    }
}

export const addInnerItem = (actions, item, createItemFunc) => async (dispatch) => {

    try {
        const { data, status } = await createItemFunc(item);

        if (status === 201) {
            dispatch(notificationSent({type: "success", message: "Record added successfully."}));
            return dispatch(actions.innerItemAdded(data));
        } else {
            dispatch(notificationSent({type: "error", message: "An error occurred creating the record."}));
        }

    } catch (err) {
        dispatch(notificationSent({type: "error", message: "An error occurred creating the record."}));
    }
}

export const removeInnerItem = (actions, itemId, removeFunc) => async (dispatch) => {

    try {
        const { status } = await removeFunc(itemId);
        if (status === 200) {
            dispatch(actions.innerItemRemoved(itemId));
            dispatch(notificationSent({type: "success", message: "The record was deleted."}));
        } else {
            dispatch(notificationSent({type: "success", message: "Failed to delete record."}));
        }
    } catch (err) {
        dispatch(notificationSent({type: "error", message: "Failed to delete record."}));
    }
}

export const getAllInnerItems = (actions, getItemsFunc) => async (dispatch) => {
    try {
        const { data, status } = await getItemsFunc()
        if (status === 200) {

            dispatch(actions.innerItemsReceived(data.filter(item => item.status === true)));
        }

    } catch (err) {
        dispatch(notificationSent({type: "error", message: "There was an error receiving events."}));
    }
}