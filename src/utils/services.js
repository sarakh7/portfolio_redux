import CreateAbout from "../components/admin/contents/about/CreateAbout";
import CreateClient from "../components/admin/contents/clients/CreateClient";
import EditClient from "../components/admin/contents/clients/EditClient";
import CreateEvent from "../components/admin/contents/events/CreateEvent";
import EditEvent from "../components/admin/contents/events/EditEvent";
import CreateCat from "../components/admin/contents/posts/post-cats/CreateCat";
import EditCat from "../components/admin/contents/posts/post-cats/EditCat";
import CreateProduct from "../components/admin/contents/products/CreateProduct";
import EditProduct from "../components/admin/contents/products/EditProduct";
import CreateProgressBar from "../components/admin/contents/progress-bars/CreateProgressBar";
import CreateProgressBarList from "../components/admin/contents/progress-bars/CreateProgressBarList";
import EditProgressBar from "../components/admin/contents/progress-bars/EditProgressBar";
import EditProgressBarList from "../components/admin/contents/progress-bars/EditProgressBarList";
import CreateSocial from "../components/admin/contents/social/CreateSocial";
import EditTestimonial from "../components/admin/contents/testimonial/EditTestimonial";
import CreateTimeline from "../components/admin/contents/tilmelines/CreateTimeline";
import EditTimeline from "../components/admin/contents/tilmelines/EditTimeline";
import EditUser from "../components/admin/contents/users/EditUser";
import { createUser, deleteUser, getAllUsers, updateUser } from "../services/authService";
import { createEvent, createTimeline, deleteEvent, deleteTimeline, getAllEvents, getAllTimelines, updateEvent, updateTimeline } from "../services/eventServices";
import { createGroup, createPost, deleteGroup, deletePost, getAllGroups, getAllPosts, updateGroup, updatePost } from "../services/postService";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../services/productService";
import { createProgressBar, getAllProgressBars, updateProgressBar, deleteProgressBar, getAllProgressBarLists, createProgressBarList, updateProgressBarList, deleteProgressBarList } from '../services/progressBarService';
import { createSocial, deleteSocial, getAllSocial, updateSocial } from "../services/socialService";
import { createTab, createTabMenu, deleteTab, deleteTabMenu, getAllTabMenues, getAllTabs, updateTabMenu } from "../services/tabMenuService";
import { createAbout, createClient, createClientsSection, createPricing, createResume, createTestimonial, deleteAbout, deleteClient, deleteClientsSection, deletePricing, deleteResume, deleteTestimonial, getAllAbouts, getAllClients, getAllClientsSection, getAllPricings, getAllResumes, getAllTestimonials, updateAbout, updateClient, updateClientsSection, updatePricing, updateResume, updateTestimonial } from "../services/themeServices";
import EditAbout from './../components/admin/contents/about/EditAbout';
import CreateTestimonial from './../components/admin/contents/testimonial/CreateTestimonial';
import EditSocial from './../components/admin/contents/social/EditSocial';
import CreateTabMenu from "../components/admin/contents/tab-menu/CreateTabMenu";
import EditTabMenu from "../components/admin/contents/tab-menu/EditTabMenu";
import EditResume from './../components/admin/contents/resume/EditResume';
import CreateClientsSection from './../components/admin/contents/clients/CreateClientsSection';
import EditClientsSection from './../components/admin/contents/clients/EditClientsSection';
import CreatePricing from './../components/admin/contents/pricing/CreatePricing';
import EditPricing from './../components/admin/contents/pricing/EditPricing';
import CreateResume from "../components/admin/contents/resume/CreateResume";
import CreatePost from "../components/admin/contents/posts/CreatePost";
import EditPost from "../components/admin/contents/posts/EditPost";

export const services = {
    posts: {
        name: "Post",
        getAllItems: getAllPosts,
        createItem: createPost,
        updateItem: updatePost,
        deleteItem: deletePost,
        createForm: <CreatePost />,
        editForm: <EditPost />
    },
    cats: {
        name: "Post Category",
        getAllItems: getAllGroups,
        createItem: createGroup,
        updateItem: updateGroup,
        deleteItem: deleteGroup,
        createForm: <CreateCat />,
        editForm: <EditCat />
    },
    events: {
        name: "Event",
        getAllItems: getAllEvents,
        createItem: createEvent,
        updateItem: updateEvent,
        deleteItem: deleteEvent,
        createForm: <CreateEvent />,
        editForm: <EditEvent />
    },
    timelines: {
        name: "Timeline",
        getAllItems: getAllTimelines,
        createItem: createTimeline,
        updateItem: updateTimeline,
        deleteItem: deleteTimeline,
        createForm: <CreateTimeline />,
        editForm: <EditTimeline />
    },
    progressbars: {
        name: "Progress Bar",
        getAllItems: getAllProgressBars,
        createItem: createProgressBar,
        updateItem: updateProgressBar,
        deleteItem: deleteProgressBar,
        createForm: <CreateProgressBar />,
        editForm: <EditProgressBar />
    },
    progressbarLists: {
        name: "Progress Bars",
        getAllItems: getAllProgressBarLists,
        createItem: createProgressBarList,
        updateItem: updateProgressBarList,
        deleteItem: deleteProgressBarList,
        createForm: <CreateProgressBarList />,
        editForm: <EditProgressBarList />
    },
    products: {
        name: "Product",
        getAllItems: getAllProducts,
        createItem: createProduct,
        updateItem: updateProduct,
        deleteItem: deleteProduct,
        createForm: <CreateProduct />,
        editForm: <EditProduct />
    },
    users: {
        name: "User",
        getAllItems: getAllUsers,
        createItem: createUser,
        updateItem: updateUser,
        deleteItem: deleteUser,
        createForm: '',
        editForm: <EditUser />
    },
    abouts: {
        name: "Settings",
        getAllItems: getAllAbouts,
        createItem: createAbout,
        updateItem: updateAbout,
        deleteItem: deleteAbout,
        createForm: <CreateAbout />,
        editForm: <EditAbout />
    },
    resumes: {
        name: "Resume",
        getAllItems: getAllResumes,
        createItem: createResume,
        updateItem: updateResume,
        deleteItem: deleteResume,
        createForm: <CreateResume />,
        editForm: <EditResume />
    },
    testimonials: {
        name: "Testimonial",
        getAllItems: getAllTestimonials,
        createItem: createTestimonial,
        updateItem: updateTestimonial,
        deleteItem: deleteTestimonial,
        createForm: <CreateTestimonial />,
        editForm: <EditTestimonial />
    },
    clients: {
        name: "Client",
        getAllItems: getAllClients,
        createItem: createClient,
        updateItem: updateClient,
        deleteItem: deleteClient,
        createForm: <CreateClient />,
        editForm: <EditClient />
    },
    clientSections: {
        name: "Client Section",
        getAllItems: getAllClientsSection,
        createItem: createClientsSection,
        updateItem: updateClientsSection,
        deleteItem: deleteClientsSection,
        createForm: <CreateClientsSection />,
        editForm: <EditClientsSection />
    },
    pricings: {
        name: "Pricing",
        getAllItems: getAllPricings,
        createItem: createPricing,
        updateItem: updatePricing,
        deleteItem: deletePricing,
        createForm: <CreatePricing />,
        editForm: <EditPricing />
    },
    socials: {
        name: "Social Mediae",
        getAllItems: getAllSocial,
        createItem: createSocial,
        updateItem: updateSocial,
        deleteItem: deleteSocial,
        createForm: <CreateSocial />,
        editForm: <EditSocial />
    },
    tabs: {
        name: "Tab",
        getAllItems: getAllTabs,
        createItem: createTab,
        deleteItem: deleteTab,
        createForm: '',
        editForm: ''
    },
    tabMenues: {
        name: "Tab Menu",
        getAllItems: getAllTabMenues,
        createItem: createTabMenu,
        updateItem: updateTabMenu,
        deleteItem: deleteTabMenu,
        createForm: <CreateTabMenu />,
        editForm: <EditTabMenu />
    },
}