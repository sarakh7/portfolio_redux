import { aboutInfoLoaded, clientsReceived, generalSettingsReceived, postsReceived, pricingReceived, profileInfoReceived, resumeReceived, socialsReceived, testimonialsReceived } from "./themeSlice";
import { services } from "../../../utils/services";
import { getTabMenuContent } from "../../../utils/getTabMenuContent";

export const getPosts = () => async (dispatch) => {

    try {
        const { status, data } = await services.posts.getAllItems();

        if (status === 200) {
            const featuresData = data.filter(value => value.cat === 1 && value.status === true);
            const worksData = data.filter(value => value.cat === 2 && value.status === true);
            const blogData = data.filter(value => value.cat === 3 && value.status === true);

            dispatch(postsReceived({
                featuresData,
                worksData,
                blogData
            }))
        }
    } catch (err) {
        console.log(err);
    }
}

export const getResume = () => async (dispatch) => {
    try {
        const { data } = await services.resumes.getAllItems();
        const filteredResumes = data.filter(item => item.status === true);
        const lastResume = filteredResumes.length > 0 ? filteredResumes[filteredResumes.length - 1] : { tab_menu: "" };
        const { tab_menu: tabMenuId } = lastResume;

        const tabs = await getTabMenuContent(tabMenuId);
        dispatch(resumeReceived(tabs));

    } catch (err) {
        console.log(err);
    }
}

export const getTestimonials = () => async (dispatch) => {
    try {
        const { status, data } = await services.testimonials.getAllItems();
        if (status === 200) {
            dispatch(testimonialsReceived(data.filter(item => item.status === true)))
        }
    } catch (err) {
        console.log(err);
    }
}

export const getClients = () => async (dispatch) => {
    try {
        const { status, data } = await services.clientSections.getAllItems();

        if (status === 200) {
            const clientSections = data.filter(item => item.status === true);
            const lastClientSection = clientSections.length > 0 ? clientSections[clientSections.length - 1] : { tab_menu: "" };
            const { tab_menu: tabMenuId } = lastClientSection;

            const tabs = await getTabMenuContent(tabMenuId);
            dispatch(clientsReceived(tabs));
        }
    } catch (err) {
        console.log(err);
    }
}

export const getPricing = () => async (dispatch) => {
    try {
        const { status, data } = await services.pricings.getAllItems();

        if (status === 200) {
            const pricings = data.filter(item => item.status === true);
            const lastPricing = pricings.length > 0 ? pricings[pricings.length - 1] : { tab_menu: "" };
            const { tab_menu: tabMenuId } = lastPricing;

            const tabs = await getTabMenuContent(tabMenuId);
            dispatch(pricingReceived(tabs));
        }
    } catch (err) {
        console.log(err);
    }
}

export const getGeneralSettings = () => async (dispatch) => {
    try {
        const { data: abouts } = await services.abouts.getAllItems();
        const { data: social } = await services.socials.getAllItems();
        const filteredAbouts = abouts.filter(item => item.status === true);
        if (filteredAbouts) {
            const settings = filteredAbouts[filteredAbouts.length - 1];
            if (settings) {
                const { data: mainBannerFile } = await services.files.getItemById(settings.main_banner);
                const { data: contactImageFile } = await services.files.getItemById(settings.contact_image);
                const { data: headerLogoFile } = await services.files.getItemById(settings.header_logo);
                const { data: footerLogoFile } = await services.files.getItemById(settings.footer_logo);

                dispatch(profileInfoReceived({
                    fullname: settings.fullname,
                    subtitle: settings.subtitle,
                    phone: settings.phone,
                    email: settings.email,
                    mainBanner: mainBannerFile.content,
                    mainDescription: settings.main_description,
                    jobs: settings.jobs,
                    contact_title: settings.contact_title,
                    contact_subtitle: settings.contact_subtitle,
                    contactImage: contactImageFile.content,
                    contact_description: settings.contact_description,
                }));

                dispatch(aboutInfoLoaded());

                dispatch(generalSettingsReceived({
                    headerLogo: headerLogoFile.content,
                    footerLogo: footerLogoFile.content,
                    siteTitle: settings.site_title,
                    copyRight: settings.copyright
                }))
            }

        }
        dispatch(socialsReceived(social.filter(item => item.status === true)));

    } catch (err) {
        console.log(err);
    }
}
