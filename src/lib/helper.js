import { useDispatch, useSelector } from "react-redux";

export const getAuthentication1 = (url) => {
    const isAuthenticate = useSelector(state => state?.auth?.isLoaded);
    useDispatch();
    return isAuthenticate;
}

export const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};

export const ROBOT_LABELS = {
    "Index, Follow": "Index, Follow",
    "Noindex, Nofollow": "Noindex, Nofollow",
    "Index, Nofollow": "Index, Nofollow",
    "Noindex, Follow": "Noindex, Follow",
};
