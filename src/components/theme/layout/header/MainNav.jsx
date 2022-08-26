import classNames from "classnames";
import { Link} from 'react-scroll';
import styles from './main-nav.module.css';
import { Fragment, useState, useContext } from 'react';
import { mainContext } from "../../../../context/mainContext";

const MainNav = ({ fixed }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const {headerLogo, siteTitle} = useContext(mainContext);

    const handleOpenModal = () => {
        setOpenMenu(true);
        document.querySelector('body').classList.add("open-modal");
    }

    const handleCloseModal = () => {
        setOpenMenu(false);
        document.querySelector('body').classList.remove("open-modal");
    }

    return (
        <Fragment>
            <div className={classNames(styles.bgOverlay, { [styles.show]: openMenu })}></div>
            <nav className={styles.navbar} >
                <div href="#home" className={fixed ? classNames(styles.brand, styles.fixedBrand) : styles.brand}>
                   {headerLogo ? <Link to="home" spy offset={-85} onClick={() => handleCloseModal()}><img src={headerLogo} alt={siteTitle} /></Link> : siteTitle}
                </div>
                <button
                    className={styles.toggleBtn}
                    onClick={() => handleOpenModal() }
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className={classNames(styles.navbarCollapse, styles.nav, { [styles.open]: openMenu })}
                >
                    <button className={styles.closeBtn}
                        onClick={() => handleCloseModal() }
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <div className={styles.navbarNav} >
                        <Link activeClass={styles.active} to="home" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()}>HOME</Link>
                        <Link activeClass={styles.active} to="features" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()}>FEATURES</Link>
                        <Link activeClass={styles.active} to="portfolio" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >PORTFOLIO</Link>
                        <Link activeClass={styles.active} to="resume" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >RESUME</Link>
                        <Link activeClass={styles.active} to="testimonial" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >testimonial</Link>
                        <Link activeClass={styles.active} to="clients" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >CLIENTS</Link>
                        <Link activeClass={styles.active} to="pricing" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >PRICING</Link>
                        <Link activeClass={styles.active} to="blog" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >BLOG</Link>
                        <Link activeClass={styles.active} to="contact" spy offset={-85} className={styles.navLink} onClick={() => handleCloseModal()} >CONTACT</Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>
                        <Link activeClass={styles.active} to="" spy offset={-85} style={{ display: "none" }}></Link>

                    </div>
                </div>
            </nav>
        </Fragment >
    );
}

export default MainNav;