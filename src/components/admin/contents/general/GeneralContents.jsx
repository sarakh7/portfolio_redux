
import { useContext, useEffect, useState, useMemo } from 'react';
import { adminContext } from '../../../../context/adminContext';
import { getGeneral } from '../../../../services/themeServices';
import { updateGeneral } from "../../../../services/themeServices";
import { Button, Form, Input, Switch } from 'antd';

const GeneralContents = () => {

    const { generalContent, setGeneralContent } = useContext(adminContext);
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status } = await getGeneral()
                if (status === 200) {
                    console.log(data);
                    setGeneralContent(data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return (
        <>
            {isLoading ? <div>Loading ...</div>
                :
                (<Form
                    name="general-content"
                    layout="vertical"
                    initialValues={{
                        site_title: generalContent.site_title,
                        header_logo: generalContent.header_logo,
                        footer_logo: generalContent.footer_logo,
                        copyright: generalContent.copyright
                    }}
                    onFinish={async (value) => {
                        try {
                            const { data, status } = await updateGeneral({ ...value, date: Date.now() });
                            if (status === 201) {
                                console.log(status, data);
                                setGeneralContent(data);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                        setDisabled(true);
                    }}
                    onFinishFailed={err => console.log(err)}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Site Title"
                        name="site_title"
                    >
                        <Input disabled={disabled} />
                    </Form.Item>
                    <Form.Item
                        label="Header Logo"
                        name="header_logo"
                    >
                        <Input disabled={disabled} />
                    </Form.Item>
                    <Form.Item
                        label="Footer Logo"
                        name="footer_logo"
                    >
                        <Input disabled={disabled} />
                    </Form.Item>
                    <Form.Item
                        label="CopyRighte"
                        name="copyright"
                    >
                        <Input disabled={disabled} />
                    </Form.Item>

                    <Form.Item>
                        {
                            disabled ? <Button type="primary" onClick={() => setDisabled(false)}>Edit Content</Button> : (
                                <>
                                    <Button onClick={() => setDisabled(true)}>Cancel</Button>
                                    {" "}
                                    <Button type="primary" htmlType="submit">Save Changes</Button>
                                </>
                            )
                        }

                    </Form.Item>
                </Form>
                )
            }
        </>

    );
}

export default GeneralContents;