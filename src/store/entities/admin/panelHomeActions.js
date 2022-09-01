
import { notificationSent } from '../../ui/uiSlice';

export const getItemNum = (action, getItemFunc) => async (dispatch) => {
    try {
        const { data } = await getItemFunc();
        dispatch(action(data.length));
    } catch (err) {
        dispatch(notificationSent({type: "error", message: "There was an error receiving data."}));
    }
}
