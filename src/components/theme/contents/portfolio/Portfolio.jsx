import { useState } from "react";
import Post from "../layout/cards/post/Post";
import { Col, Modal, Row } from "react-bootstrap";
import PortfolioContent from "./PortfolioContent";
import FadeUpBox from "../layout/box/fade-up-box/FadeUpBox";
import styles from './portfolio.module.css';
import { useAppServices } from "../../../../hooks/useAppServices";

const Portfolio = ({ works }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const services = useAppServices()

    const handleWorkClick = async (work) => {
        
        //This is a temporary way to get a base64 image
        // In the real server, the file address is passed as the value of the image, and there is no need to receive the image in this way

        if (work.image) {
            try {
                const { data, status } = await services.files.getItemById(work.image);
                if (status === 200) {
                    setModalContent({ ...work, image: data.content });
                    setShowModal(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Row className={styles.portfolio}>
                {
                    works.map((work, index) =>
                        <Col key={work.id} lg={4} className={styles.Post} onClick={() => handleWorkClick(work)}>
                            <FadeUpBox
                                key={work.id}
                                delay={(2 * index + 1 - (6 * Math.floor(index / 3))) / 10}
                            >
                                <Post
                                    key={work.id}
                                    subtitle={work.subtitle}
                                    title={work.title}
                                    image={work.image}
                                    targetLink={work.targetLink}
                                />
                            </FadeUpBox>
                        </Col>
                    )
                }

            </Row>


            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName={styles.modal}
                contentClassName={styles.modalContent}
                aria-labelledby="portfolio-content"
                centered
                backdropClassName={styles.backdrop}
            >
                <button className={styles.closeBtn}
                    onClick={() => setShowModal(false)}
                >
                    <i className="fas fa-times"></i>
                </button>
                <Modal.Body>
                    <PortfolioContent modalContent={modalContent} />
                </Modal.Body>
            </Modal>

        </>

    );
}

export default Portfolio
