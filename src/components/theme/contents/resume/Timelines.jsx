import { Col } from "react-bootstrap";
import Timeline from "../layout/timeline/Timeline";
import TimeCard from '../layout/timeline/TimeCard';
import { Row } from 'react-bootstrap';

const Timelines = ({ leftInfo, rightInfo }) => {
    return (
        <Row>
            <Col lg={6}>
                <Timeline title={leftInfo.title} subtitle={leftInfo.subtitle}>
                    {
                        leftInfo.events.map((event, index) => (
                            <TimeCard
                                key={index}
                                title={event.title}
                                subtitle={event.subtitle}
                                score={event.score}
                            >
                                {event.description}
                            </TimeCard>
                        ))
                    }

                </Timeline>
            </Col>

            <Col lg={6}>
                <Timeline title={rightInfo.title} subtitle={rightInfo.subtitle}>
                    {
                        rightInfo.events.map((event, index) => (
                            <TimeCard
                                key={index}
                                title={event.title}
                                subtitle={event.subtitle}
                                score={event.score}
                            >
                                {event.description}
                            </TimeCard>
                        ))
                    }
                 
                </Timeline>
            </Col>
        </Row>
    );
}

export default Timelines;