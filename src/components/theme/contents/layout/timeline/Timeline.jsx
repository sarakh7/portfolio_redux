import styles from './timeline.module.css';

const Timeline = ({ subtitle, title, children }) => {
    return (
        <div>
            <div className={styles.titleWrapper}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h4 className={styles.title}>{title}</h4>
            </div>

            <div className={styles.timeline}>
                {children}
            </div>
        </div>
    );
}

export default Timeline;