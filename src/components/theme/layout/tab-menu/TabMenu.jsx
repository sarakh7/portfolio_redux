import { createContext, useState, useContext, useEffect } from 'react';
import { Row, ButtonGroup, Col } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';
import classNames from 'classnames';
import styles from './tab-menu.module.css';

const TabContext = createContext();

const Tab = ({ label, id, value, children }) => {

    const { activeTab, setActiveTab, setTabContent, name } = useContext(TabContext);

    useEffect(() => {
        if (activeTab === `${name}-${value}`) {
            setTabContent(<TabContent key={id}>{children}</TabContent>);
        }
    }, []);

    return (
        <ToggleButton
            id={`${name}-${id}`}
            type="radio"
            name={name}
            value={`${name}-${value}`}
            variant=""
            onChange={
                (e) => {
                    setActiveTab(e.currentTarget.value);
                    setTabContent(<TabContent key={id}>{children}</TabContent>);

                }
            }
            className={classNames(styles.tab, { [styles.active]: ((activeTab === `${name}-${value}`)) })}
        >
            {label}
        </ToggleButton>
    );
}

const TabContent = ({ children }) => {

    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);

    }, []);

    return (
        <div className={classNames(styles.tabContent, { [styles.showContent]: show })}>
            {children}
        </div>
    );
}

export default TabContent;

const Tabs = ({ name, defaultValue, direction, className, children }) => {

    const [activeTab, setActiveTab] = useState(`${name}-${defaultValue}`);
    const [tabContent, setTabContent] = useState();
    const [show, setShow] = useState(false);

    const { Provider } = TabContext;

    return (
        <Provider
            value={
                {
                    activeTab: activeTab,
                    setActiveTab: setActiveTab,
                    tabContent: tabContent,
                    setTabContent: setTabContent,
                    activeTab: activeTab,
                    name: name,
                    setShow: setShow,
                    show: show,
                }
            }
        >
            {direction === "vertical" ?

                <Row className={classNames(styles.vertical, className)}>
                    <Col lg={4} className="mb-4">
                        <ButtonGroup defaultValue={`${name}-${defaultValue}`} className={styles.tabs}>
                            {children}
                        </ButtonGroup>
                    </Col>
                    <Col lg={8}>
                        {tabContent}
                    </Col>

                </Row>
                :
                <>
                    <ButtonGroup defaultValue={`${name}-${defaultValue}`} className={classNames(styles.tabs, className)}>
                        {children}
                    </ButtonGroup>

                    {tabContent}
                </>
            }

        </Provider>
    );
}

export {
    TabContext,
    Tabs,
    Tab
};