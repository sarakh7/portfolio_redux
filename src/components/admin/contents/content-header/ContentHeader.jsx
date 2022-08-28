
import styles from './content-header.module.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

const ContentHeader = ({ title, btnTitle, icon, action }) => {

    const dispatch = useDispatch();
    return (
        <div className={styles.pageHeader}>
            <div className={styles.title}><h3>{title}</h3></div>
            {
                btnTitle
                    ? <Button
                        className={styles.newBtn}
                        type="primary"
                        danger
                        onClick={() => dispatch(action())} icon={icon}
                    >
                        {btnTitle}
                    </Button>
                    : ""
            }
        </div>
    );
}

export default ContentHeader;