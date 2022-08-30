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
import TabMenues from '../contents/tab-menu/TabMenues';
import Resumes from '../contents/resume/Resumes';
import Testimonials from '../contents/testimonial/Testimonials';
import Clients from '../contents/clients/Clients';
import Pricings from '../contents/pricing/Pricings';
import ClientsSections from '../contents/clients/ClientsSections';
import Socials from '../contents/social/Socials';
import Abouts from '../contents/about/Abouts';
import Home from '../contents/home/Home';
import Users from './../contents/users/Users';
import SliceProvider from '../../../context/SliceProvider';
import { catsSlice, eventsSlice, productsSlice } from '../../../store/entities/adminSlices';
import { timelinesSlice, progressbarsSlice, progressbarListsSlice } from './../../../store/entities/adminSlices';
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

    { name: 'Tab Menues', key: 'tab-menues', icon: <MenuOutlined />, component: <TabMenues /> },
    { name: 'Users', key: 'users', icon: <UserOutlined />, component: <Users /> },

    {
        name: "Tteme Settings",
        key: "theme-settings",
        icon: <SettingOutlined />,
        component: "",
        children: [
            { name: 'General Settings', key: 'general', component: <Abouts /> },
            { name: 'Resumes', key: 'resumes', component: <Resumes /> },
            { name: 'Testimonials', key: 'testimonials', component: <Testimonials /> },
            { name: 'Clients', key: 'clients', component: <Clients /> },
            { name: 'Clients Section', key: 'all-clients-section', component: <ClientsSections /> },
            { name: 'Pricings', key: 'pricings', component: <Pricings /> },
            { name: 'Social Icons', key: 'all-socials', component: <Socials /> },
        ],
    },

]

export default pages