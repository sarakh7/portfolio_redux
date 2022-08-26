import { getAllEvents, getAllTimelines } from "../services/eventServices";
import { getAllPosts } from "../services/postService";
import { getAllProducts } from "../services/productService";
import { getAllProgressBarLists, getAllProgressBars } from "../services/progressBarService";
import { getAllTabMenues, getAllTabs } from "../services/tabMenuService";
import { getAllClients } from "../services/themeServices";


const getAllTabContents = async (contentType) => {
    switch (contentType) {
        case 1: return { allData: await getAllTimelines(), allInnerData: await getAllEvents() }
        case 2: return { allData: await getAllProgressBarLists(), allInnerData: await getAllProgressBars() }
        case 3: return { allData: await getAllProducts() }
        case 4: return { allData: await getAllPosts() }
        case 5: return { allData: await getAllClients() }
        default: return []
    }
};

const getInnerTabContent = (contentType, tabContent, allInnerData) => {

    let leftInnerContentIds = [];
    let rightInnerContentIds = [];
    let leftInnerContent = [];
    let rightInnerContent = [];
    let leftTitle = "";
    let rightTitle = "";
    let leftSubTitle = "";
    let rightSubTitle = "";

    const tabLeftContent = tabContent[0]
    const tabRightContent = tabContent[1];

    switch (contentType) {
        case 1:
            // if contentType is Timeline
            leftInnerContentIds = tabLeftContent?.events;
            rightInnerContentIds = tabRightContent?.events;
            leftTitle = tabLeftContent?.title;
            rightTitle = tabRightContent?.title;
            leftSubTitle = tabLeftContent?.subtitle;
            rightSubTitle = tabRightContent?.subtitle;
            break
        case 2:
            // if contentType is Progress bar list
            leftInnerContentIds = tabLeftContent?.progressbars;
            rightInnerContentIds = tabRightContent?.progressbars;
            leftTitle = tabLeftContent?.title;
            rightTitle = tabRightContent?.title;
            leftSubTitle = tabLeftContent?.subtitle;
            rightSubTitle = tabRightContent?.subtitle;
            break
        default: leftInnerContentIds = [];
            rightInnerContentIds = [];
            break
    }

    leftInnerContent = allInnerData.data.filter(d => leftInnerContentIds.includes(d.id));
    rightInnerContent = allInnerData.data.filter(d => rightInnerContentIds.includes(d.id));

    return { leftTitle, leftSubTitle, leftInnerContent, rightTitle, rightSubTitle, rightInnerContent };

};

export const getTabMenuContent = async (tabMenuId) => {
    const tabs = [];

    try {

        const { data: tabMenues } = await getAllTabMenues();
        const { data: allTabs } = await getAllTabs();

        if (tabMenuId) {

            const activeTabMenu = tabMenues.find(menu => menu.id === parseInt(tabMenuId));
            const { tabs: activeTabList } = activeTabMenu;
            const filteredTabs = allTabs.filter(tab => activeTabList.includes(tab.id));

            await filteredTabs.reduce(async (promise, tab) => {
                await promise;
                try {
                    const { type, content: contentIds } = tab;
                    const { allData, allInnerData } = await getAllTabContents(type);
                    const filteredData = allData.data.filter(d => contentIds.includes(d.id.toString()) && d.status === true);

                    if (allInnerData) {
                        const { leftTitle, leftSubTitle, leftInnerContent, rightTitle, rightSubTitle, rightInnerContent } = getInnerTabContent(type, filteredData, allInnerData);
                        tabs.push({ contentType: type, title: tab.title, leftTitle, leftSubTitle, rightTitle, rightSubTitle, leftContent: leftInnerContent, rightContent: rightInnerContent })
                    }
                    else {
                        tabs.push({ contentType: type, title: tab.title, content: filteredData })
                    }

                } catch (err) {
                    console.log(err);
                }

            }, Promise.resolve());

        }

    } catch (err) {
        console.log(err.message)
    }

    return tabs;
}