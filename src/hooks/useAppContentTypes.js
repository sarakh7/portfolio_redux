import { useAppServices } from './useAppServices';

export const useAppContentTypes = () => {

    const appServices = useAppServices();

    const contentTypes = {
        timeline: { title: "Timeline", value: 1, service: appServices.timelines },
        progressbar: { title: "Progress Bar", value: 2, service: appServices.progressbarLists },
        product: { title: "Products", value: 3, service: appServices.products },
        post: { title: "Post", value: 4, service: appServices.posts },
        client: { title: "Client", value: 5, service: appServices.clients }
    }

    return contentTypes;
}