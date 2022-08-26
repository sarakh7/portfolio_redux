import styles from './social.module.css'
import SocialCard from './SocialCard';

const Social = ({title, data}) => {
    return ( 
        <>
        <div className={styles.title}>{title}</div>
        <div className={styles.socialWrapper}>
            {data.map((social, index) => 
                <a key={index} href={social.link} className={styles.link}>
                    <SocialCard key={index}>
                    <i className={social.icon}></i>
                    </SocialCard>
                </a>
            )}
        </div>
        </>
     );
}
 
export default Social;