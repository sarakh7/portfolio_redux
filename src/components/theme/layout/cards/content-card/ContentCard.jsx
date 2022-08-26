import styles from './content-card.module.css';
import classNames from 'classnames';

const ContentCard = ({ title, subtitle, score, className, children }) => {
    return (
        <div className={classNames(styles.contentCard, className)}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <div className={styles.tittleWrapper}>
                        <h4 className={styles.title}>{title}</h4>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </div>
                    <div><span className={styles.badge}>{score}</span></div>
                </div>
                <div className="divider"></div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );
}

export default ContentCard;