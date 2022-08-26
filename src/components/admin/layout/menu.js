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
import PostCats from '../contents/posts/post-cats/PostCats';
import Posts from '../contents/posts/Posts';
import Events from '../contents/events/Events';
import Timelines from '../contents/tilmelines/Timelines';
import ProgressBars from '../contents/progress-bars/ProgressBars';
import ProgressBarLists from '../contents/progress-bars/ProgressBarLists';
import TabMenues from '../contents/tab-menu/TabMenues';
import Resumes from '../contents/resume/Resumes';
import Testimonials from '../contents/testimonial/Testimonials';
import Clients from '../contents/clients/Clients';
import Pricings from '../contents/pricing/Pricings';
import ClientsSections from '../contents/clients/ClientsSections';
import Products from '../contents/products/Products';
import Socials from '../contents/social/Socials';
import Abouts from '../contents/about/Abouts';
import Home from '../contents/home/Home';
import Users from './../contents/users/Users';


const pages = [
    { name: "Home", key: "home", icon: <HomeOutlined />, component: <Home />},
    {
        name: "Posts",
        key: "posts",
        icon: <FormOutlined />,
        component: "",
        children: [
            { name: 'Posts', key: 'all-posts', component: <Posts /> },
            { name: 'Categories', key: 'posts-cats', component: <PostCats /> }
        ],
    },
    {
        name: "TimeLines",
        key: "timeline",
        icon: <ClockCircleOutlined />,
        component: "",
        children: [
            { name: 'Events', key: 'all-events', component: <Events /> },
            { name: 'Timelines', key: 'timelines', component: <Timelines /> },
        ],
    },
    {
        name: "ProgressBars",
        key: "progress-bar",
        icon: <AlignLeftOutlined />,
        component: "",
        children: [
            { name: 'PrgoressBars', key: 'all-progress-bars', component: <ProgressBars /> },
            { name: 'ProgressBar Lists', key: 'progress-bar-lists', component: <ProgressBarLists /> },
        ],
    },

    {
        name: 'Products',
        key: 'all-products',
        icon: <ShoppingOutlined />,
        component: <Products />
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