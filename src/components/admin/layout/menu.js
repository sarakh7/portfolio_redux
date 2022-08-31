import {
    HomeOutlined,
    FormOutlined,
    ClockCircleOutlined,
    AlignLeftOutlined,
    MenuOutlined,
    SettingOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import Posts from '../contents/posts/Posts';
import Pricings from '../contents/pricing/Pricings';
import Home from '../contents/home/Home';
import SliceProvider from '../../../context/SliceProvider';
import { aboutsSlice, catsSlice, clientSectionsSlice, clientsSlice, eventsSlice, productsSlice, resumesSlice, socialsSlice, tabMenuesSlice, usersSlice } from '../../../store/entities/adminSlices';
import { timelinesSlice, progressbarsSlice, progressbarListsSlice, testimonialsSlice } from './../../../store/entities/adminSlices';
import ContentLayout from './ContentLayout';
import { services } from './../../../utils/services';


const pages = [
    { name: "Home", key: "home", icon: <HomeOutlined />, component: <Home /> },
    {
        name: "Posts",
        key: "posts",
        icon: <FormOutlined />,
        component: "",
        children: [
            { name: 'Posts', key: 'all-posts', component: <Posts /> },
            {
                name: 'Categories', key: 'posts-cats', component:
                    <SliceProvider slice={catsSlice} service={services.cats}>
                        <ContentLayout />
                    </SliceProvider>
            }
        ],
    },
    {
        name: "TimeLines",
        key: "timeline",
        icon: <ClockCircleOutlined />,
        component: "",
        children: [
            {
                name: 'Events', key: 'all-events', component:
                    <SliceProvider slice={eventsSlice} service={services.events} >
                        <ContentLayout />
                    </SliceProvider>
            },
            {
                name: 'Timelines', key: 'timelines', component:
                    <SliceProvider slice={timelinesSlice} service={services.timelines}>
                        <ContentLayout />
                    </SliceProvider>
            },
        ],
    },
    {
        name: "ProgressBars",
        key: "progress-bar",
        icon: <AlignLeftOutlined />,
        component: "",
        children: [
            {
                name: 'PrgoressBars', key: 'all-progress-bars', component:
                    <SliceProvider slice={progressbarsSlice} service={services.progressbars}>
                        <ContentLayout />
                    </SliceProvider>
            },
            {
                name: 'ProgressBar Lists', key: 'progress-bar-lists', component:
                    <SliceProvider slice={progressbarListsSlice} service={services.progressbarLists}>
                        <ContentLayout />
                    </SliceProvider>
            },
        ],
    },

    {
        name: 'Products',
        key: 'all-products',
        icon: <ShoppingOutlined />,
        component: <SliceProvider slice={productsSlice} service={services.products}><ContentLayout /></SliceProvider>
    },

    {
        name: 'Tab Menues', key: 'tab-menues', icon: <MenuOutlined />,
        component: <SliceProvider slice={tabMenuesSlice} service={services.tabMenues}><ContentLayout /></SliceProvider>
    },
    {
        name: 'Users', key: 'users', icon: <UserOutlined />,
        component: <SliceProvider slice={usersSlice} service={services.users}><ContentLayout /></SliceProvider>
    },

    {
        name: "Tteme Settings",
        key: "theme-settings",
        icon: <SettingOutlined />,
        component: "",
        children: [
            { name: 'General Settings', key: 'general', component: <SliceProvider slice={aboutsSlice} service={services.abouts}><ContentLayout /></SliceProvider> },
            { name: 'Resumes', key: 'resumes', component: <SliceProvider slice={resumesSlice} service={services.resumes}><ContentLayout /></SliceProvider> },
            { name: 'Testimonials', key: 'testimonials', component: <SliceProvider slice={testimonialsSlice} service={services.testimonials}><ContentLayout /></SliceProvider> },
            { name: 'Clients', key: 'clients', component: <SliceProvider slice={clientsSlice} service={services.clients}><ContentLayout /></SliceProvider> },
            { name: 'Clients Section', key: 'all-clients-section', component: <SliceProvider slice={clientSectionsSlice} service={services.clientSections}><ContentLayout /></SliceProvider> },
            { name: 'Pricings', key: 'pricings', component: <Pricings /> },
            { name: 'Social Icons', key: 'all-socials', component: <SliceProvider slice={socialsSlice} service={services.socials}><ContentLayout /></SliceProvider> },
        ],
    },

]

export default pages