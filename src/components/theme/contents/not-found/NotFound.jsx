import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { META } from "../../../../utils/meta";
import styles from './not-found.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <Helmet>
                <title>{`${META.SiteName} - Not Found`}</title>
            </Helmet>
            <div className={styles.err}>404</div>
            <h1 className={styles.title}>not found</h1>
            <div className={styles.description}>
                <p>Sorry, the page you requested could not be found</p>
                <p>Please go back to the homepage</p>
            </div>
            <Link to="/" className={styles.linkBtn}>GO HOME</Link>
        </div>
    );
}

export default NotFound;