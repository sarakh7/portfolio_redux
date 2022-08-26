import classNames from 'classnames';
import { getFileById } from '../../../../../services/themeServices';
import BlackBox from '../../box/black-box/BlackBox';
import styles from './post.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Post = ({ title, subtitle, image, date, targetLink }) => {

    const [postImage, setPostImage] = useState();

    const fetchImage = async () => {
        if (image) {
            try {
                const { data, status } = await getFileById(image);
                if(status === 200) {
                    setPostImage(data.content);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchImage();
    }, [])

    return (
        <div className={styles.box}>
            <BlackBox>

                <div className={styles.image}>
                    <img src={postImage} alt={title} />
                </div>

                <div className={styles.header}>
                    <span className={styles.subtitle}>{subtitle}</span>
                    {date ? <span className={styles.date}><i className="far fa-clock"></i> {date}</span> : ''}
                </div>

                <div to={targetLink} className={styles.linkTitle}>
                    <h4 className={styles.title}>{title} </h4>
                    <i className={classNames("fas fa-arrow-right", styles.arrowUpRight)}></i>
                </div>


            </BlackBox>
        </div>
    );
}

export default Post;