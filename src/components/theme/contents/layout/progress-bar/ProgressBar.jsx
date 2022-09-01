import { useState } from 'react';
import styles from './progress-bar.module.css';
import { useEffect } from 'react';

const ProgressBar = ({ label, value, delay }) => {
    
    const [progressBarValue, setProgressBarValue] = useState("0");

    useEffect(() => {
        setProgressBarValue(value);
    }, []);

    return (
        <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} style={{transitionDelay: `${(delay)/10}s` , width: progressBarValue}}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>

        </div>
    );
}

export default ProgressBar;