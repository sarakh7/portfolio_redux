import classNames from 'classnames';
import BlackBox from '../../box/black-box/BlackBox';
import styles from './post.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppServices } from '../../../../../../hooks/useAppServices';

const Post = ({ title, subtitle, image, date, targetLink }) => {

    const [postImage, setPostImage] = useState();

    const services = useAppServices()

    //This is a temporary way to get a base64 image
    // In the real server, the file address is passed as the value of the image, and there is no need to receive the image in this way

    const fetchImage = async () => {
        if (image) {
            try {
                const { data, status } = await services.files.getItemById(image);
                if (status === 200) {
                    setPostImage(data.content);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchImage();
    }, [postImage])

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