
import styles from './content-header.module.css';
import { Button } from 'antd';

const ContentHeader = ({title, btnTitle, icon, action}) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.title}><h3>{title}</h3></div>
            {
                btnTitle ? <Button className={styles.newBtn} type="primary" danger onClick={() => action(prevValue => !prevValue)} icon={icon}> {btnTitle}</Button> 
                : ""
            }
        </div>
    );
}

export default ContentHeader;