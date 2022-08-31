
import { getFileById } from "../../../services/themeServices";
import { useState, useEffect } from 'react';
import styles from './clients.module.css';

const ClientCard = ({ client }) => {

    const [clientImage, setClientImage] = useState();

    const fetchImage = async () => {
        
        //This is a temporary way to get a base64 image
        // In the real server, the file address is passed as the value of the image, and there is no need to receive the image in this way

        if (client.image) {
            try {
                const { data, status } = await getFileById(client.image);
                if (status === 200) {
                    setClientImage(data.content);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchImage();
    }, [])

    return (
        <div className={styles.clientItem}>
            <img src={clientImage} alt={client.title} />
            <div className="divider"></div>
            <div className={styles.clientTitle}>{client.title}</div>
        </div>
    );
}

export default ClientCard;