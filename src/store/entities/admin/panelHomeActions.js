
import { toast } from 'react-toastify';

export const getItemNum = (action, getItemFunc) => async (dispatch) => {
    try {
        const { data } = await getItemFunc();
        dispatch(action(data.length));
    } catch (err) {
        toast.error("There was an error receiving data.");
        console.log(err)
    }
}
