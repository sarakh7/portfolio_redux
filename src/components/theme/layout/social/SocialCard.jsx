import styles from './social.module.css'

const SocialCard = ({children}) => {
    return (
        <div className={styles.box}>
            {children}
        </div>
    );
}

export default SocialCard;