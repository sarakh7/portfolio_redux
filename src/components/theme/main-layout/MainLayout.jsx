import MainNav from "../contents/layout/header/MainNav";
import Footer from '../contents/layout/footer/Footer';
import styles from './main-layout.module.css';
import { Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSelector } from 'react-redux';

const MainLayout = ({ children }) => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const [headerHeight, setHeaderHeight] = useState();

    const {
        headerLogo,
        footerLogo,
        siteTitle,
        copyRight
    } = useSelector(state => state.entities.theme)

    const ref = useRef();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }

    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <>
            <header
                ref={ref}
                className={scrollPosition > headerHeight ? classNames(styles.header, styles.headerFixed) : styles.header}
            >
                <div className={styles.headerContainer}>
                    <MainNav
                        fixed={scrollPosition > headerHeight ? true : false}
                        headerLogo={headerLogo}
                        siteTitle={siteTitle}
                    />
                </div>
            </header>
            <main className={styles.contentWrapper}>
                <Container>
                    {children}
                </Container>
            </main>
            <footer>
                <Footer
                    copyRight={copyRight}
                    footerLogo={footerLogo}
                />
            </footer>
        </>
    );
}

export default MainLayout;