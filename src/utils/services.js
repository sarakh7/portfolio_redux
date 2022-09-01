import { createUser, deleteUser, getAllUsers, updateUser } from "../services/authService";
import { createEvent, createTimeline, deleteEvent, deleteTimeline, getAllEvents, getAllTimelines, updateEvent, updateTimeline } from "../services/eventServices";
import { createGroup, createPost, deleteGroup, deletePost, getAllGroups, getAllPosts, updateGroup, updatePost } from "../services/postService";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../services/productService";
import { createProgressBar, getAllProgressBars, updateProgressBar, deleteProgressBar, getAllProgressBarLists, createProgressBarList, updateProgressBarList, deleteProgressBarList } from '../services/progressBarService';
import { createSocial, deleteSocial, getAllSocial, updateSocial } from "../services/socialService";
import { createTab, createTabMenu, deleteTab, deleteTabMenu, getAllTabMenues, getAllTabs, updateTabMenu } from "../services/tabMenuService";
import { createAbout, createClient, createClientsSection, createFile, createPricing, createResume, createTestimonial, deleteAbout, deleteClient, deleteClientsSection, deleteFile, deletePricing, deleteResume, deleteTestimonial, getAllAbouts, getAllClients, getAllClientsSection, getAllFiles, getAllPricings, getAllResumes, getAllTestimonials, getFileById, updateAbout, updateClient, updateClientsSection, updatePricing, updateResume, updateTestimonial } from "../services/themeServices";

import {
    CreateAbout,
    CreateClient,
    EditClient,
    CreateEvent,
    EditEvent,
    CreateCat,
    EditCat,
    CreateProduct,
    EditProduct,
    CreateProgressBar,
    CreateProgressBarList,
    EditProgressBar,
    EditProgressBarList,
    CreateSocial,
    EditTestimonial,
    CreateTimeline,
    EditTimeline,
    EditUser,
    EditAbout,
    CreateTestimonial,
    EditSocial,
    CreateTabMenu,
    EditTabMenu,
    EditResume,
    CreateClientsSection,
    EditClientsSection,
    CreatePricing,
    EditPricing,
    CreateResume,
    CreatePost,
    EditPost
} from '../components/admin/contents'

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
    files: {
        name: "files",
        getAllItems: getAllFiles,
        getItemById: getFileById,
        createItem: createFile,
        deleteItem: deleteFile,
    }
}