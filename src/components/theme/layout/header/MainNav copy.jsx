import classNames from "classnames";
import { Nav, Navbar } from "react-bootstrap";
import styles from './main-nav.module.css';

const MainNav = ({fixed}) => {
    console.log(fixed);
    return (
        <Navbar collapseOnSelect expand="lg" className={styles.navbarDark} >
            <Navbar.Brand href="#home" className={fixed ? classNames(styles.brand, styles.fixedBrand) : styles.brand}><img src={require("../../../assets/images/logo.png")} alt="brand" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.toggle} />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="ms-auto">
                    <Nav.Link href="#deets" className={styles.navLink}>HOME</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>FEATURES</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>PORTFOLIO</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>RESUME</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>CLIENTS</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>PRICING</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>BLOG</Nav.Link>
                    <Nav.Link href="#deets" className={styles.navLink}>CONTACT</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNav;