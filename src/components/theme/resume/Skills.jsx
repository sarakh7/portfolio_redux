import { Col, Row } from "react-bootstrap";
import ProgressBar from "../layout/progress-bar/ProgressBar";

import styles from './skills.module.css'

const Skills = ({ leftInfo, rightInfo }) => {

    return (
        <Row>
            <Col lg={6}>
                <div className={styles.titleWrapper}>
                    <span className={styles.subtitle}>{leftInfo.subtitle}</span>
                    <h4 className={styles.title}>{leftInfo.title}</h4>
                </div>
                {leftInfo.skills.map((skill, index) =>
                    <ProgressBar key={index} delay={index} label={skill.title} value={`${skill.score}%`} />
                )}
            </Col>
            <Col lg={6}>
                <div className={styles.titleWrapper}>
                    <span className={styles.subtitle}>{rightInfo.subtitle}</span>
                    <h4 className={styles.title}>{rightInfo.title}</h4>
                </div>
                {rightInfo.skills.map((skill, index) =>
                    <ProgressBar key={index} delay={index} label={skill.title} value={`${skill.score}%`} />
                )}
            </Col>
        </Row>
    );
}

export default Skills;