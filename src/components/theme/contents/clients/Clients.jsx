import { useAppContentTypes } from '../../../../hooks/useAppContentTypes';
import { Tab, Tabs } from '../layout/tab-menu/TabMenu';
import styles from './clients.module.css';
import ClientsContent from './ClientsContent';

const Clients = ({ tabs }) => {

    const contentTypes = useAppContentTypes();

    return (
        <div className={styles.clientWrapper}>
            <div style={{ height: "auto", position: "relative" }}>

                <Tabs
                    key="client-tabs"
                    name="clients"
                    defaultValue="tab-1"
                    direction="vertical"
                >
                    {tabs.map((tab, index) => {
                        if (tab.contentType === contentTypes.client.value) {
                            return (
                                <Tab
                                    key={`clients-tab-${index}`}
                                    id={`tab-${index}`}
                                    value={`tab-${index}`}
                                    label={tab.title}
                                >
                                    <ClientsContent
                                        key={index}
                                        clients={tab.content}
                                    />
                                </Tab>
                            )
                        } else {
                            return <Tab
                                key={`clients-tab-${index}`}
                                id={`tab-${index}`}
                                value={`tab-${index}`}
                                label={tab.title}
                            >Can not display this Content type</Tab>
                        }

                    })}

                </Tabs>

            </div>
        </div>
    );
}

export default Clients;