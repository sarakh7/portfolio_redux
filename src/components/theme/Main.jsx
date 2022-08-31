import Blog from './blog/Blog';
import Clients from './clients/Clients';
import Contact from './contact/Contact';
import Features from './features/Features';
import Home from './home/Home';
import MainLayout from './layout/main-layout/MainLayout';
import Section from './layout/section/Section';
import Portfolio from './portfolio/Portfolio';
import Pricing from './pricing/Pricing';
import Resume from './resume/Resume';
import Slider from './testimonial/slider/Slider';
import { useState, useEffect, useContext } from 'react';
import { getAllPosts } from '../../services/postService';
import { getAllAbouts, getAllClientsSection, getAllPricings, getAllResumes, getAllTestimonials, getFileById } from '../../services/themeServices';
import { getTabMenuContent } from './helpers/getTabMenuContent';
import { getAllSocial } from '../../services/socialService';
import { Spin } from 'antd';
import { mainContext } from '../../context/MainProvider';
import { Helmet } from 'react-helmet-async';
import {META} from '../../utils/meta';

const Main = () => {

    const [posts, setPosts] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [works, setWorks] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [resume, setResume] = useState([]);
    const [clients, setClients] = useState([]);
    const [pricing, setPricing] = useState([]);
    const [tesimonials, setTestimonials] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const [loadingAboutInfo, setLoadingAboutInfo] = useState(true);
    const [socials, setSocials] = useState([]);

    const {
        setHeaderLogo,
        setFooterLogo,
        setSiteTitle,
        setCopyRight
    } = useContext(mainContext);


    const fetchPosts = async () => {
        try {
            const { status, data } = await getAllPosts();

            if (status === 200) {
                setPosts(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchResume = async () => {
        try {
            const { data: resumes } = await getAllResumes();
            const filteredResumes = resumes.filter(item => item.status === true);
            const lastResume = filteredResumes.length > 0 ? filteredResumes[filteredResumes.length - 1] : { tab_menu: "" };
            const { tab_menu: tabMenuId } = lastResume;

            const tabs = await getTabMenuContent(tabMenuId);
            setResume(tabs);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchTestimonials = async () => {
        try {
            const { status, data } = await getAllTestimonials();
            const filteredTestimonials = data.filter(item => item.status === true);
            if (status === 200) {
                setTestimonials(filteredTestimonials);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchClients = async () => {
        try {
            const { data } = await getAllClientsSection();
            const clientSections = data.filter(item => item.status === true);
            const lastClientSection = clientSections.length > 0 ? clientSections[clientSections.length - 1] : { tab_menu: "" };
            const { tab_menu: tabMenuId } = lastClientSection;

            const tabs = await getTabMenuContent(tabMenuId);
            setClients(tabs);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchPricing = async () => {
        try {
            const { data } = await getAllPricings();
            const pricings = data.filter(item => item.status === true);
            const lastPricing = pricings.length > 0 ? pricings[pricings.length - 1] : { tab_menu: "" };
            const { tab_menu: tabMenuId } = lastPricing;

            const tabs = await getTabMenuContent(tabMenuId);
            setPricing(tabs);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchGeneralSettings = async () => {
        try {
            const { data: abouts } = await getAllAbouts();
            const { data: social } = await getAllSocial();
            const filteredAbouts = abouts.filter(item => item.status === true);
            const filteredSocials = social.filter(item => item.status === true);
            if (filteredAbouts) {
                const settings = filteredAbouts[filteredAbouts.length - 1];
                if (settings) {
                    const { data: mainBannerFile } = await getFileById(settings.main_banner);
                    const { data: contactImageFile } = await getFileById(settings.contact_image);
                    const { data: headerLogoFile } = await getFileById(settings.header_logo);
                    const { data: footerLogoFile } = await getFileById(settings.footer_logo);

                    setProfileInfo({
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
                    });
                    setLoadingAboutInfo(false);
                    setHeaderLogo(headerLogoFile.content);
                    setFooterLogo(footerLogoFile.content);
                    setSiteTitle(settings.site_title);
                    setCopyRight(settings.copyright);
                }

            }
            if (filteredSocials) {
                setSocials(filteredSocials);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchGeneralSettings();
        fetchPosts();
        fetchResume();
        fetchClients();
        fetchPricing();
        fetchTestimonials();

    }, []);

    useEffect(() => {

        const featuresData = posts.filter(value => value.cat === 1 && value.status === true);
        setFeaturesData(featuresData);

        const worksData = posts.filter(value => value.cat === 2 && value.status === true);
        setWorks(worksData);

        const blogData = posts.filter(value => value.cat === 3 && value.status === true);
        setBlogData(blogData);

    }, [posts])

    return (

        <MainLayout>

            <Helmet>
                <title>{META.SiteName}</title>
            </Helmet>

            <Section key="section-1" sectionId="home" untitled={true} >
                {!loadingAboutInfo ? <Home socials={socials} profileInfo={profileInfo} />
                    : <div className='main-spinner'><Spin size="large" /></div>
                }
            </Section>

            <Section key="section-2" sectionId="features" subtitle="features" title="what i do" titleLeft={true}>
                <Features featuresData={featuresData} />
            </Section>

            <Section key="section-3" sectionId="portfolio" subtitle="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK" title="My Portfolio">
                <Portfolio works={works} />
            </Section>

            <Section key="section-4" sectionId="resume" subtitle="7+ YEARS OF EXPERIENCE" title="My Resume">
                <Resume tabs={resume} />
            </Section>

            <Section key="section-5" sectionId="testimonial" subtitle="WHAT CLIENTS SAY" title="Testimonial">
                <Slider slides={tesimonials} />
            </Section>

            <Section key="section-6" sectionId="clients" subtitle="POPULAR CLIENTS" title="Awesome Clients" titleLeft={true}>
                <Clients tabs={clients} />
            </Section>

            <Section key="section-7" sectionId="pricing" untitled={true} >
                <Pricing tabs={pricing} />
            </Section>

            <Section key="section-8" sectionId="blog" subtitle="VISIT MY BLOG AND KEEP YOUR FEEDBACK" title="my blog" >
                <Blog blogData={blogData} />
            </Section>

            <Section key="section-9" sectionId="contact" subtitle="CONTACT" title="Contact With Me" >
                {!loadingAboutInfo ? <Contact socials={socials} profileInfo={profileInfo} />
                    : <div className='main-spinner'><Spin size="large" /></div>
                }
            </Section>

        </MainLayout>

    );
}

export default Main;