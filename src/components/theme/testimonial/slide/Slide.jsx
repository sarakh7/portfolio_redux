import { Col, Row } from 'react-bootstrap';
import styles from './slide.module.css';
import ContentCard from '../../layout/cards/content-card/ContentCard';
import ImageCard from '../../layout/cards/image-card/ImageCard';
import { useEffect, Fragment } from 'react';
import { useState } from 'react';
import { getFileById } from '../../../../services/themeServices';

const Slide = ({ content }) => {

    const [stars, setStars] = useState([]);

    const [slideImage, setSlideImage] = useState();

    const fetchImage = async () => {
        if (content.image) {
            try {
                const { data, status } = await getFileById(content.image);
                if (status === 200) {
                    setSlideImage(data.content);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const showRating = () => {
        const { score } = content;
        const newStars = [];
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                newStars.push(<img src={require("../../../../assets/images/icons/rating.png")} alt="rating" />);
            } else {
                newStars.push(<img src={require("../../../../assets/images/icons/rating-empty.png")} alt="rating" />);
            }
        }
        setStars(newStars);
    }
    useEffect(() => {
        fetchImage();
        showRating();
    }, [])

    return (
        <Row className={styles.slideWrapper}>
            <Col lg={4}>
                <ImageCard
                    title={content.client_name}
                    subtitle={content.company}
                    image={slideImage}
                    label={content.client_job}
                />
            </Col>
            <Col lg={8}>
                <div className={styles.slideContent}>
                    <ContentCard
                        title={content.title}
                        subtitle={content.subtitle}
                        score={stars.map((star, index) => <Fragment key={index}>{star} </Fragment>)}
                        className={styles.slideContentCard}

                    >
                        The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante.
                    </ContentCard>
                </div>

            </Col>
        </Row>
    );
}

export default Slide;