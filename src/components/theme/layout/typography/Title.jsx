import styles from './typography.module.css';
import classNames from 'classnames';

const Title = ({title, subtitle, titleLeft, className}) => {
    return (
        <div className={classNames(styles.titleWrapper, { [styles.textleft]: titleLeft }, className)}>
            <span className={styles.subtitle}>{subtitle}</span>
            <h3 className={styles.title}>{title}</h3>
        </div>
    );
}

export default Title;