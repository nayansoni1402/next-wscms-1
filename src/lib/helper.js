import { useDispatch, useSelector } from "react-redux";

export const getAuthentication1 = (url) => {
    const isAuthenticate = useSelector(state => state?.auth?.isLoaded);
    useDispatch();
    return isAuthenticate;
}

export const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};

export const ROBOT_LABELS = [
    { id: 'Index, Follow', title: 'Index, Follow' },
    { id: 'Noindex, Nofollow', title: 'Noindex, Nofollow' },
    { id: 'Index, Nofollow', title: 'Index, Nofollow' },
    { id: 'Noindex, Follow', title: 'Noindex, Follow' },
];