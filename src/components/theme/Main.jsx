import Blog from './contents/blog/Blog';
import Clients from './contents/clients/Clients';
import Contact from './contents/contact/Contact';
import Features from './contents/features/Features';
import Home from './contents/home/Home';
import MainLayout from './main-layout/MainLayout';
import Section from './contents/layout/section/Section';
import Portfolio from './contents/portfolio/Portfolio';
import Pricing from './contents/pricing/Pricing';
import Resume from './contents/resume/Resume';
import Slider from './contents/testimonial/slider/Slider';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { Helmet } from 'react-helmet-async';
import {META} from '../../utils/meta';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, getGeneralSettings, getPosts, getPricing, getResume, getTestimonials } from '../../store/entities/theme/themeActions';

const Main = () => {

    const dispatch = useDispatch();

    const {
        featuresData,
        works,
        blogData,
        resume,
        clients,
        pricing,
        tesimonials,
        profileInfo,
        loadingAboutInfo,
        socials,
    } = useSelector(state => state.entities.theme)


    useEffect(() => {
        dispatch(getGeneralSettings());
        dispatch(getPosts());
        dispatch(getResume());
        dispatch(getClients());
        dispatch(getPricing());
        dispatch(getTestimonials());

    }, [dispatch]);


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