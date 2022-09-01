
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { notificationShown } from '../../../store/ui/uiSlice';
const Notification = () => {

    const dispatch = useDispatch();

    const {showNotification, notification} = useSelector(state => state.ui);

    useEffect(() => {
        if(showNotification && notification.type === 'error') {
            toast.error(notification.message);
            dispatch(notificationShown());
        }
        else if(showNotification && notification.type === 'success') {
            toast.success(notification.message);
            dispatch(notificationShown());
        }
        else if(showNotification && notification.type === 'warning') {
            toast.warning(notification.message);
            dispatch(notificationShown());
        }
    }, [showNotification, notification])
    
    return (
        <ToastContainer theme="colored" />
    );
}
 
export default Notification;