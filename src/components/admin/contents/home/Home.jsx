import { Container, Row, Col } from "react-bootstrap";
import { Tag, Divider } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllPosts } from "../../../../services/postService";
import { getAllProducts } from "../../../../services/productService";

import styles from './admin-home-content.module.css';
import { getAllEvents, getAllTimelines } from "../../../../services/eventServices";
import { getAllProgressBars } from "../../../../services/progressBarService";
import { getAllTabMenues } from "../../../../services/tabMenuService";
import { toast } from 'react-toastify';

const Home = () => {

    const [postNum, setPostNum] = useState(0);
    const [productNum, setProductNum] = useState(0);
    const [eventNum, setEventNum] = useState(0);
    const [timelineNum, setTimelineNum] = useState(0);
    const [progressNum, setProgressNum] = useState(0);
    const [menuNum, setMenuNum] = useState(0);

    const getPostNum = async () => {
        try {
            const { data } = await getAllPosts();
            setPostNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };

    const getProductNum = async () => {
        try {
            const { data } = await getAllProducts();
            setProductNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };
        
    const getEventNum = async () => {
        try {
            const { data } = await getAllEvents();
            setEventNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };

    const getTimelineNum = async () => {
        try {
            const { data } = await getAllTimelines();
            setTimelineNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };

    const getProgressNum = async () => {
        try {
            const { data } = await getAllProgressBars();
            setProgressNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };

    const getMenuNum = async () => {
        try {
            const { data } = await getAllTabMenues();
            setMenuNum(data.length);
        } catch (err) {
            toast.error("There was an error receiving data.");
        }
    };


    useEffect(() => {
        getPostNum();
        getProductNum();
        getEventNum();
        getTimelineNum();
        getProgressNum();
        getMenuNum();
    }, []);

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