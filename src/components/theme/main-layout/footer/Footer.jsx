import styles from './footer.module.css';

const Footer = ({ footerLogo, copyRight }) => {

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