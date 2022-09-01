import { Container } from 'react-bootstrap';
import styles from './section.module.css';
import Title from './../typography/Title';

const Section = ({ children, sectionId, title, subtitle, untitled, titleLeft }) => {
    return (
        <>
            <section id={sectionId} className={styles.section}>
                <Container className={styles.container}>
                    {
                        untitled ? '' :
                            (
                                <Title title={title} subtitle={subtitle} titleLeft={titleLeft} />
                            )
                    }

                    {children}
                </Container>

                <div className="divider"></div>
            </section>
        </>

    );
}

export default Section;