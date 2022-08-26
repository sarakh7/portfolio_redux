
import { createContext, useState } from 'react';

const adminContext = createContext({
    resumes: [],
    setResumes: () => { },
    testimonials : [],
    setTestimonials: () => {},
    clients : [],
    setClients: () => {},
    clientsSections : [],
    setClientsSections: () => {},
    pricings: [],
    setPricings: () => {},
    abouts: [],
    setAbouts: () => {},
    socials: [],
    setSocials: () => {},
    generalContent: {},
    setGeneralContent: () => {},
    posts: [],
    setPosts: () => {},
    cats: [],
    setCats: () => {},
    events: [],
    setEvents: () => {},
    timelines: [],
    setTimelines: () => {},
    progressBars: [],
    setProgressBars: () => {},
    progressBarLists: [],
    setProgressBarLists: () => {},
    products: [],
    setProducts: () => {},
    tabMenues: [],
    setTabMenues: () => {},
    users: [],
    setUsers: () => {},

});

const AdminProvider = ({ children }) => {

    const [resumes, setResumes] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [clients, setClients] = useState([]);
    const [clientsSections, setClientsSections] = useState([]);
    const [pricings, setPricings] = useState([]);
    const [abouts, setAbouts] = useState([]);
    const [socials, setSocials] = useState([]);
    const [generalContent, setGeneralContent] = useState([]);
    const [posts, setPosts] = useState([]);
    const [cats, setCats] = useState([]);
    const [events, setEvents] = useState([]);
    const [timelines, setTimelines] = useState([]);
    const [progressBars, setProgressBars] = useState([]);
    const [progressBarLists, setProgressBarLists] = useState([]);
    const [products, setProducts] = useState([]);
    const [tabMenues, setTabMenues] = useState([]);
    const [users, setUsers] = useState([]);

    const { Provider } = adminContext;

    return (
        <Provider
            value={
                {
                    resumes,
                    setResumes,
                    testimonials,
                    setTestimonials,
                    clients,
                    setClients,
                    clientsSections,
                    setClientsSections,
                    pricings,
                    setPricings,
                    abouts,
                    setAbouts,
                    socials,
                    setSocials,
                    generalContent,
                    setGeneralContent,
                    posts,
                    setPosts,
                    cats,
                    setCats,
                    events,
                    setEvents,
                    timelines,
                    setTimelines,
                    progressBars,
                    setProgressBars,
                    progressBarLists,
                    setProgressBarLists,
                    products,
                    setProducts,
                    tabMenues,
                    setTabMenues,
                    users,
                    setUsers
                }
            }
        >
            {children}
        </Provider>
    )

}

export {
    adminContext,
    AdminProvider
}