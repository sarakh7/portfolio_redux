import { getAllAbouts, getFileById } from "../../services/themeServices";
import { logoReceived } from "./uiSlice";

export const getPanelLogo = () => async (dispatch) => {
    try {
        const { data, status } = await getAllAbouts();
        if (status === 200) {
            const filteredAbouts = data.filter(item => item.status === true);
            if (filteredAbouts) {
                const settings = filteredAbouts[filteredAbouts.length - 1];
                const { data: panelLogoFile } = await getFileById(settings.panel_logo);
                dispatch(logoReceived(panelLogoFile.content))
            }
        }
    } catch (err) {
        console.log(err)
    }
}