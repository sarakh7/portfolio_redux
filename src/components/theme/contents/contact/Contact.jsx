import { Col, Row } from 'react-bootstrap';
import ImageCard from '../layout/cards/image-card/ImageCard';
import Social from '../layout/social/Social';
import ContactForm from './form/ContactForm';
import styles from './contact.module.css';

const Contact = ({socials, profileInfo}) => {

    return (
        <Row className={styles.contactWrapper}>
            <Col lg={5}>
                <ImageCard
                    title={profileInfo.contact_title}
                    image={profileInfo.contactImage}
                    label={profileInfo.contact_subtitle}
                    className={styles.contactCard}
                >
                    <div className={styles.cardBody}>
                        <div className={styles.description}>
                        {profileInfo.contact_description}
                        </div>
                        <div className={styles.contactInfo}>
                            <div className={styles.info}>
                                <span className={styles.label}>Phone:</span>
                                <span className={styles.text}>{profileInfo.phone}</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.text}>{profileInfo.email}</span>
                            </div>
                        </div>
                        <Social title="find with me" data={socials} />
                    </div>
                </ImageCard>
            </Col>
            <Col lg={7}>
                <div className={styles.formWrapper}>
                    <ContactForm />
                </div>
            </Col>
        </Row>
    );
}

export default Contact;