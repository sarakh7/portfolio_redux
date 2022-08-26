import { Col, Row } from "react-bootstrap";
import FadeUpBox from "../layout/box/fade-up-box/FadeUpBox";
import FeatureCard from "./FeatureCard";

import styles from './features.module.css';

const Features = ({featuresData}) => {

    return (

        <Row className={styles.features}>
            {
                featuresData.map((feature, index) =>
                    <Col key={feature.id} lg={4} className={styles.featureCard}>
                        <FadeUpBox key={feature.id} delay={(2 * index + 1 - (6 * Math.floor(index / 3))) / 10}>
                            <FeatureCard
                                key={feature.id}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.abstract}
                                targetLink="#"
                            />
                        </FadeUpBox>
                    </Col>)
            }
        </Row>

    );
}

export default Features;