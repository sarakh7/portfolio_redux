
import { createContext, useState } from 'react';
const mainContext = createContext({
    headerLogo: "",
    setHeaderLogo: () => {},
    footerLogo: "",
    setFooterLogo: () => {},
    siteTitle: "",
    setSiteTitle: () => {},
    copyRight: "",
    setCopyRight: () => {},
});

const MainProvider = ({ children }) => {

    const [headerLogo, setHeaderLogo] = useState("");
    const [footerLogo, setFooterLogo] = useState("");
    const [siteTitle, setSiteTitle] = useState("");
    const [copyRight, setCopyRight] = useState("");

    const { Provider } = mainContext;

    return (
        <Provider
            value={
                {
                    headerLogo,
                    setHeaderLogo,
                    footerLogo,
                    setFooterLogo,
                    siteTitle,
                    setSiteTitle,
                    copyRight,
                    setCopyRight
                }
            }
        >
            {children}
        </Provider>
    )

}

export {
    mainContext,
    MainProvider
}