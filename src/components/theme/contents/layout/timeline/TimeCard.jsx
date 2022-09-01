import BlackBox from './../box/black-box/BlackBox';
import styles from './time-card.module.css';

const TimeCard = ({ title, subtitle, score, children }) => {
    return (
        <div className={styles.timeCard}>
            <BlackBox curve={10}>
                <div className={styles.header}>
                    <div className={styles.tittleWrapper}>
                        <h4 className={styles.title}>{title}</h4>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </div>
                    <div className={styles.badge}>{score}</div>
                </div>
                <div className="divider"></div>
                <div className={styles.body}>{children}</div>
            </BlackBox>
        </div>
    );
}

export default TimeCard;