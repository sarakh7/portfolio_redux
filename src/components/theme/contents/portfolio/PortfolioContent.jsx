import { Link } from 'react-scroll';
import styles from './portfolio-content.module.css';
import { Row, Col } from 'react-bootstrap';

const PortfolioContent = ({ modalContent }) => {
    return (
        <Row className={styles.contentWrapper}>

            <Col lg={6}>
                <div className={styles.imageWrapper}>
                    <img src={modalContent.image} alt="portfolio" />
                </div>
            </Col>
            <Col lg={6} className={styles.body}>
                <span className={styles.subtitle}>{modalContent.subtitle}</span>
                <h3 className={styles.title}>{modalContent.title}</h3>
                <div className={styles.description}>
                    <div className={styles.abstract}>
                        {modalContent.abstract}
                    </div>
                    <div>
                        {modalContent.description}
                    </div>
                </div>
                <Link to="#" className={styles.btn}><span className={styles.linkTitle}>view project</span> <i className='fas fa-arrow-right'></i></Link>

            </Col>
        </Row>
    );
}

export default PortfolioContent;