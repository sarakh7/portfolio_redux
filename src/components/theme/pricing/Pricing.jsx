import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
import Title from '../layout/typography/Title';
import { Tabs, Tab } from '../layout/tab-menu/TabMenu';
import ContentCard from '../layout/cards/content-card/ContentCard';
import styles from './pricing.module.css';

const Pricing = ({ tabs }) => {
    return (
        <Row>
            <Col lg={5}>
                <Title title="my pricing" subtitle="pricing" titleLeft={true} />
            </Col>
            <Col lg={7}>
                <div className={styles.contentWrapper}>
                    <Tabs key="pricing" name="pricing" defaultValue="tab-0" className={styles.tabMenu}>
                        {tabs.map((tab, index) => {
                            if (tab.contentType === 3) {
                                return (
                                    <Tab
                                        key={`pricing-tab-${index}`}
                                        id={`tab-${index}`}
                                        value={`tab-${index}`}
                                        label={tab.title}
                                    >
                                        <ContentCard
                                            key={index}
                                            title={tab.content[0]?.title}
                                            subtitle={tab.content[0]?.subtitle}
                                            score={tab.content[0]?.price}
                                            className={styles.contentCard}

                                        >
                                            <p>{tab.content[0]?.description}</p>
                                            <div className={styles.list}>
                                                <ul className={styles.left}>
                                                    {
                                                        tab.content[0]?.features.map((feature, idx) => (
                                                            ((idx + 1) % 2) !== 0 ? <li key={idx} className={styles.item}><i className="fas fa-check"></i><span>{feature}</span></li> : null
                                                        ))
                                                    }
                                                </ul>
                                                <ul className={styles.right}>
                                                    {
                                                        tab.content[0]?.features.map((feature, idx) => (
                                                            ((idx + 1) % 2) === 0 ? <li key={idx} className={styles.item}><i className="fas fa-check"></i><span>{feature}</span></li> : null
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <Link to="#" className={styles.btn}><span className={styles.linkTitle}>order now </span> <i className='fas fa-arrow-right'></i></Link>
                                        </ContentCard>
                                    </Tab>
                                )
                            } else {
                                return <Tab
                                    key={`pricing-tab-${index}`}
                                    id={`tab-${index}`}
                                    value={`tab-${index}`}
                                    label={tab.title}
                                >Can not display this Content type</Tab>
                            }

                        })}

                    </Tabs>

                </div>

            </Col>
        </Row>
    );
}

export default Pricing;