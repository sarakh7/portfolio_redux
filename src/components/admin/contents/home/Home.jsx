import { Container, Row, Col } from "react-bootstrap";
import { Tag, Divider } from 'antd';
import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './admin-home-content.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAppServices } from './../../../../hooks/useAppServices';
import { getItemNum } from "../../../../store/entities/homeActions";
import {
    eventNumReceived,
    menuNumReceived,
    postNumReceived,
    productNumReceived,
    progressNumReceived,
    timelineNumReceived
} from "../../../../store/entities/homeSlice";


const Home = () => {

    const dispatch = useDispatch();

    const services = useAppServices();

    const {
        postNum,
        productNum,
        eventNum,
        timelineNum,
        progressNum,
        menuNum
    } = useSelector(state => state.entities.home);


    useEffect(() => {
        dispatch(getItemNum(postNumReceived, services.posts.getAllItems));
        dispatch(getItemNum(productNumReceived, services.products.getAllItems));
        dispatch(getItemNum(eventNumReceived, services.events.getAllItems));
        dispatch(getItemNum(timelineNumReceived, services.timelines.getAllItems));
        dispatch(getItemNum(progressNumReceived, services.progressbars.getAllItems));
        dispatch(getItemNum(menuNumReceived, services.tabMenues.getAllItems));
    }, [dispatch, services, getItemNum]);

    return (
        <Container>
            <h3 className="text-center">WebSite Contents</h3>
            <Divider />
            <Row>
                <Col sm={4} className="text-center">
                    <div className={styles.card}>
                        <Tag color="#b4436c"><span className={styles.number}>{postNum}</span></Tag>
                        <span className={styles.title}>Posts</span>
                    </div>

                </Col>
                <Col sm={4} className="text-center">
                    <div className={styles.card}>
                        <Tag color="#F2C14E"><span className={styles.number}>{productNum}</span></Tag>
                        <span className={styles.title}>Products</span>
                    </div>
                </Col>
                <Col sm={4} className="text-center">
                    <div className={classNames(styles.card, styles.lastColumn)}>
                        <Tag color="#5FAD56"><span className={styles.number}>{eventNum}</span></Tag>
                        <span className={styles.title}>Events</span>
                    </div>
                </Col>
                <Col sm={4} className="text-center">
                    <div className={classNames(styles.card, styles.lastRow)}>
                        <Tag color="#4d9078"><span className={styles.number}>{timelineNum}</span></Tag>
                        <span className={styles.title}>Timelines</span>
                    </div>

                </Col>
                <Col sm={4} className="text-center">
                    <div className={classNames(styles.card, styles.lastRow)}>
                        <Tag color="#f78154"><span className={styles.number}>{progressNum}</span></Tag>
                        <span className={styles.title}>Progress Bars</span>
                    </div>
                </Col>
                <Col sm={4} className="text-center">
                    <div className={classNames(styles.card, styles.lastRow, styles.lastColumn)}>
                        <Tag color="#40798c"><span className={styles.number}>{menuNum}</span></Tag>
                        <span className={styles.title}>Tab Menues</span>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default Home;