import { Col, Row } from 'react-bootstrap';
import styles from './contact-form.module.css'
import classNames from 'classnames';
import { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";

const contactSchema = yup.object().shape({
    name: yup.string().required("The name is required"),
    phone: yup.number().required("The phone number is required"),
    email: yup.string().email("The email is not valid").required("The email is required"),
    subject: yup.string().required("The subject is required"),
    text: yup.string().required("The message is required"),
});

const ContactForm = () => {

    const [finished, setFinished] = useState(false);

    return (
        <>
            {
                finished ? <div className='mt-4'>Your message has been successfully sent.</div>
                    :
                    <Formik
                        initialValues={
                            {
                                name: "",
                                phone: "",
                                email: "",
                                subject: "",
                                text: ""
                            }
                        }
                        validationSchema={contactSchema}
                        onSubmit={() => setFinished(true)}
                    >
                        <Form className={styles.form} >
                            <Row>
                                <Col lg={6}>
                                    <label className='mt-4' htmlFor="name">YOUR NAME</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={styles.field}
                                    />
                                    <ErrorMessage
                                        name='name'
                                        render={msg => <div className={classNames(styles.error, "text-danger")}>{msg}</div>}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <label className='mt-4' htmlFor="phone">PHONE NUMBER</label>
                                    <Field
                                        name="phone"
                                        type="number"
                                        className={styles.field}
                                    />
                                    <ErrorMessage
                                        name='phone'
                                        render={msg => <div className="text-danger">{msg}</div>}
                                    />
                                </Col>
                            </Row>
                            <label className='mt-4' htmlFor='email'>Email</label>
                            <Field
                                name="email"
                                type="email"
                                className={styles.field}
                            />
                            <ErrorMessage
                                name='email'
                                render={msg => <div className="text-danger">{msg}</div>}
                            />
                            <label className='mt-4' htmlFor='subject'>Subject</label>
                            <Field
                                name="subject"
                                type="text"
                                className={styles.field}
                            />
                            <ErrorMessage
                                name='subject'
                                render={msg => <div className="text-danger">{msg}</div>}
                            />
                            <label className='mt-4' htmlFor='text'>YOUR MESSAGE</label>
                            <Field
                                name="text"
                                component="textarea"
                                className={classNames(styles.field, styles.textField)}
                            />
                            <ErrorMessage
                                name='text'
                                render={msg => <div className="text-danger">{msg}</div>}
                            />
                            <button type="submit" className={styles.btn}>
                                <span className={styles.linkTitle}>Send Message </span> <i className='fas fa-arrow-right'></i>
                            </button>
                        </Form>
                    </Formik>

            }
        </>

    );
}

export default ContactForm;