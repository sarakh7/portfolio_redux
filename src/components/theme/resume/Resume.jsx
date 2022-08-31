import { Tabs, Tab } from '../layout/tab-menu/TabMenu';
import Timelines from "./Timelines";
import Skills from "./Skills";
import { useAppContentTypes } from './../../../hooks/useAppContentTypes';

const Resume = ({ tabs }) => {

    const contentTypes = useAppContentTypes();

    return (
        <>
            <Tabs key="resume" name="resume" defaultValue="tab-0">
                {
                    tabs.map((tab, index) => {
                        if (tab.contentType === contentTypes.timeline.value) {
                            return (
                                <Tab
                                    key={`resume-tab-${index}`}
                                    id={`tab-${index}`}
                                    value={`tab-${index}`}
                                    label={tab.title}
                                >
                                    <Timelines
                                        key={`resume-${index}`}
                                        leftInfo={{
                                            title: tab.leftTitle,
                                            subtitle: tab.leftSubTitle,
                                            events: tab.leftContent,
                                        }}
                                        rightInfo={{
                                            title: tab.rightTitle,
                                            subtitle: tab.rightSubTitle,
                                            events: tab.rightContent
                                        }}
                                    />
                                </Tab>
                            )
                        } else if (tab.contentType === contentTypes.progressbar.value) {
                            return (
                                <Tab
                                    key={`resume-tab-${index}`}
                                    id={`tab-${index}`}
                                    value={`tab-${index}`}
                                    label={tab.title}
                                >
                                    <Skills
                                        key={`resume-${index}`}
                                        leftInfo={{
                                            title: tab.leftTitle,
                                            subtitle: tab.leftSubTitle,
                                            skills: tab.leftContent,
                                        }}
                                        rightInfo={{
                                            title: tab.rightTitle,
                                            subtitle: tab.rightSubTitle,
                                            skills: tab.rightContent
                                        }}
                                    />
                                </Tab>
                            )
                        } else {
                            return <Tab
                                key={`resume-tab-${index}`}
                                id={`tab-${index}`}
                                value={`tab-${index}`}
                                label={tab.title}
                            >Can not display this Content type</Tab>
                        }
                    }

                    )
                }

            </Tabs>
        </>
    );
}

export default Resume;