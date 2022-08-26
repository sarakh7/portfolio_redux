import { useNavigate } from "react-router-dom"
import { Button } from 'antd';
import { Helmet } from "react-helmet-async";
import { META } from "../../utils/meta";
import styles from './authentication.module.css';

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className={styles.unautorized}>
            <Helmet>
                <title>{`${META.SiteName} - Unauthorized`}</title>
            </Helmet>
            <h1 className={styles.unAuthTitle}>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <Button type='danger' onClick={goBack}>Go Back</Button>
            </div>
        </div>
    )
}

export default Unauthorized
