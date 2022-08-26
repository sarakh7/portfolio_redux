import classNames from 'classnames';
import styles from './black-box.module.css';

const BlackBox = ({ curve, size, className, children }) => {

    const customStyles = {
        borderRadius: curve ? `${curve}px` : '',
        width: size ? `${size}px` : '',
        height: size ? `${size}px` : '',

    }

    return (

        <div className={classNames(styles.box, className)} style={customStyles}>
            <div className={styles.back} style={curve? {borderRadius: `${curve}px`} : {}}>
            </div>
            {children}
        </div >
    );
}

export default BlackBox;