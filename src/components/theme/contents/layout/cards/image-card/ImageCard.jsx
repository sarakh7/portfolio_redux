import classNames from 'classnames';
import styles from './image-card.module.css';

const ImageCard = ({ title, subtitle, label, image, className, children}) => {
    return (
        <div className={classNames(styles.box, className)}>
            <div className={styles.image}>
                <img src={image} alt={title} />
            </div>
            <span className={styles.subtitle}>{subtitle}</span>
            <h4 className={styles.title}>{title} </h4>
            <span className={styles.label}>{label}</span>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}

export default ImageCard;