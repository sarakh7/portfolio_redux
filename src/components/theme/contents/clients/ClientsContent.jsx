import { Col, Row } from "react-bootstrap";
import BlackBox from "../layout/box/black-box/BlackBox";
import ClientCard from "./ClientCard";
import styles from './clients.module.css';

const ClientsContent = ({clients}) => {

    return (
        <Row>
            {clients.map((client, index) =>
                <Col key={index} lg={4} className="mb-4">
                    <BlackBox key={index} curve={10}>
                        <div className={styles.clientItem}>
                            <ClientCard key={index} client={client} />
                        </div>
                    </BlackBox>
                </Col>
            )}
        </Row>
    );
}

export default ClientsContent;