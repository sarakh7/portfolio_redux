import { Tabs, Tab } from '../layout/tab-menu/TabMenu';
import Timelines from "./Timelines";
import Skills from "./Skills";

const Resume = ({ tabs }) => {

    return (
        <>
            <Tabs key="resume" name="resume" defaultValue="tab-0">
                {
                    tabs.map((tab, index) => {
                        if (tab.contentType === 1) {
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
                        } else if (tab.contentType === 2) {
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