import CreateCat from "../components/admin/contents/posts/post-cats/CreateCat";
import EditCat from "../components/admin/contents/posts/post-cats/EditCat";
import { createUser, deleteUser, getAllUsers, updateUser } from "../services/authService";
import { createEvent, createTimeline, deleteEvent, deleteTimeline, getAllEvents, getAllTimelines, updateEvent, updateTimeline } from "../services/eventServices";
import { createGroup, createPost, deleteGroup, deletePost, getAllGroups, getAllPosts, updateGroup, updatePost } from "../services/postService";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../services/productService";
import { createProgressBar, getAllProgressBars, updateProgressBar, deleteProgressBar, getAllProgressBarLists, createProgressBarList, updateProgressBarList, deleteProgressBarList } from '../services/progressBarService';
import { createSocial, deleteSocial, getAllSocial, updateSocial } from "../services/socialService";
import { createTab, createTabMenu, deleteTab, deleteTabMenu, getAllTabMenues, getAllTabs, updateTabMenu } from "../services/tabMenuService";
import { createAbout, createClient, createClientsSection, createPricing, createResume, createTestimonial, deleteAbout, deleteClient, deleteClientsSection, deletePricing, deleteResume, deleteTestimonial, getAllAbouts, getAllClients, getAllClientsSection, getAllPricings, getAllResumes, getAllTestimonials, updateAbout, updateClient, updateClientsSection, updatePricing, updateResume, updateTestimonial } from "../services/themeServices";

export const services = {
    posts: {
        name: "Post",
        getAllItems: getAllPosts,
        createItem: createPost,
        updateItem: updatePost,
        deleteItem: deletePost,
        createForm: '',
        editForm: ''
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
        createForm: '',
        editForm: ''
    },
    timelines: {
        name: "Timeline",
        getAllItems: getAllTimelines,
        createItem: createTimeline,
        updateItem: updateTimeline,
        deleteItem: deleteTimeline,
        createForm: '',
        editForm: ''
    },
    progressbars: {
        name: "Progress Bar",
        getAllItems: getAllProgressBars,
        createItem: createProgressBar,
        updateItem: updateProgressBar,
        deleteItem: deleteProgressBar,
        createForm: '',
        editForm: ''
    },
    progressbarLists: {
        name: "Progress Bars",
        getAllItems: getAllProgressBarLists,
        createItem: createProgressBarList,
        updateItem: updateProgressBarList,
        deleteItem: deleteProgressBarList,
        createForm: '',
        editForm: ''
    },
    products: {
        name: "Product",
        getAllItems: getAllProducts,
        createItem: createProduct,
        updateItem: updateProduct,
        deleteItem: deleteProduct,
        createForm: '',
        editForm: ''
    },
    users: {
        name: "User",
        getAllItems: getAllUsers,
        createItem: createUser,
        updateItem: updateUser,
        deleteItem: deleteUser,
        createForm: '',
        editForm: ''
    },
    abouts: {
        name: "About Section",
        getAllItems: getAllAbouts,
        createItem: createAbout,
        updateItem: updateAbout,
        deleteItem: deleteAbout,
        createForm: '',
        editForm: ''
    },
    resumes: {
        name: "Resume",
        getAllItems: getAllResumes,
        createItem: createResume,
        updateItem: updateResume,
        deleteItem: deleteResume,
        createForm: '',
        editForm: ''
    },
    Testimonials: {
        name: "Testimonial",
        getAllItems: getAllTestimonials,
        createItem: createTestimonial,
        updateItem: updateTestimonial,
        deleteItem: deleteTestimonial,
        createForm: '',
        editForm: ''
    },
    clients: {
        name: "Client",
        getAllItems: getAllClients,
        createItem: createClient,
        updateItem: updateClient,
        deleteItem: deleteClient,
        createForm: '',
        editForm: ''
    },
    clientSections: {
        name: "Client Section",
        getAllItems: getAllClientsSection,
        createItem: createClientsSection,
        updateItem: updateClientsSection,
        deleteItem: deleteClientsSection,
        createForm: '',
        editForm: ''
    },
    pricing: {
        name: "Pricing",
        getAllItems: getAllPricings,
        createItem: createPricing,
        updateItem: updatePricing,
        deleteItem: deletePricing,
        createForm: '',
        editForm: ''
    },
    socials: {
        name: "Social Mediae",
        getAllItems: getAllSocial,
        createItem: createSocial,
        updateItem: updateSocial,
        deleteItem: deleteSocial,
        createForm: '',
        editForm: ''
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
        name: "Tab Menue",
        getAllItems: getAllTabMenues,
        createItem: createTabMenu,
        updateItem: updateTabMenu,
        deleteItem: deleteTabMenu,
        createForm: '',
        editForm: ''
    },
}