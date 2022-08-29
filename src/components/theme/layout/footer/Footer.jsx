import styles from './footer.module.css';
import { useContext } from 'react';
import { mainContext } from '../../../../context/MainProvider';

const Footer = () => {

    const { footerLogo, copyRight } = useContext(mainContext);

    return (
        <div className={styles.footer}>
            {footerLogo ? <img className={styles.footerLogo} src={footerLogo} alt="footer-logo" />
                : ""}
            <p className={styles.copyRight}>{copyRight}</p>
        </div>
    );
}

export default Footer;
<div>

</div>